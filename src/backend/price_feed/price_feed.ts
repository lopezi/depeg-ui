import { BigNumber, Signer } from "ethers";
import moment from "moment";
import { AggregatorV3Interface, AggregatorV3Interface__factory } from "../../contracts/chainlink-contracts";
import { DepegProduct__factory, IPriceDataProvider, UsdcPriceDataProvider, UsdcPriceDataProvider__factory } from "../../contracts/depeg-contracts";
import { PriceFeedApi } from "./api";

const MAX_DATAPOINTS = 100;

export class PriceFeed implements PriceFeedApi {

    private productAddress: string;
    private signer: Signer;
    private chainlinkAggregatorAddress: string | undefined;
    private aggregator: AggregatorV3Interface | undefined;
    private priceDataProvider: UsdcPriceDataProvider | undefined;

    constructor(productAddress: string, signer: Signer) {
        this.productAddress = productAddress;
        this.signer = signer;
        this.chainlinkAggregatorAddress = process.env.NEXT_PUBLIC_CHAINLINK_PRICEFEED_CONTRACT_ADDRESS;
    }

    async getChainlinkAggregator(): Promise<AggregatorV3Interface> {
        if (this.aggregator !== undefined) {
            return this.aggregator;
        }

        await this.init();
        return this.aggregator!;
    }

    async init() {
        let address = this.chainlinkAggregatorAddress;
        if (address === undefined) {
            const depegProduct = DepegProduct__factory.connect(this.productAddress, this.signer);
            const priceDataProviderAddress = await depegProduct.getPriceDataProvider();
            this.priceDataProvider = UsdcPriceDataProvider__factory.connect(priceDataProviderAddress, this.signer);
            address = await this.priceDataProvider.getChainlinkAggregatorAddress();
        }

        this.aggregator = AggregatorV3Interface__factory.connect(address, this.signer);
    }

    async getPriceDataProvider(): Promise<UsdcPriceDataProvider> {
        if (this.priceDataProvider !== undefined) {
            return this.priceDataProvider;
        }

        await this.init();
        return this.priceDataProvider!;
    }

    async getLatestPrice(priceRetrieved: (price: PriceInfo, triggeredAt: number, depeggedAt: number) => void): Promise<void> {
        const aggregator = await this.getPriceDataProvider();
        const [ roundId,
            price,
            compliance,
            stability,
            eventType,
            triggeredAt,
            depeggedAt,
            updatedAt ] = await aggregator.getLatestPriceInfo();
        const priceInfo: PriceInfo = {
            roundId: roundId.toString(),
            price: price.toString(),
            timestamp: updatedAt.toNumber(),
        };
        // console.log(priceInfo, triggeredAt.toNumber(), depeggedAt.toNumber());
        priceRetrieved(priceInfo, triggeredAt.toNumber(), depeggedAt.toNumber());
    }

    async getPrice(roundId: BigNumber, priceRetrieved: (price: PriceInfo) => void): Promise<void> {
        const aggregator = await this.getPriceDataProvider();
        const roundData = await aggregator.getRoundData(roundId);
        const priceInfo: PriceInfo = {
            roundId: roundData.roundId.toString(),
            price: roundData.answer.toString(),
            timestamp: roundData.updatedAt.toNumber(),
        };
        priceRetrieved(priceInfo);
    }

    async getAllPricesAfter(
        after: number, 
        priceRetrieved: (price: PriceInfo) => void, 
        loadingStarted: () => void,
        loadingFinished: () => void,
    ): Promise<void> {
        console.log("starting to get historical prices after " + after);
        loadingStarted();
        const aggregator = await this.getChainlinkAggregator();
        let roundData = await aggregator.latestRoundData();
        let timestamp = moment.unix(roundData.updatedAt.toNumber());
        let afterTs = moment.unix(after);
        let i = 0;

        while (timestamp.isAfter(afterTs) && i++ < MAX_DATAPOINTS) {
            priceRetrieved({
                roundId: roundData.roundId.toString(),
                price: roundData.answer.toString(),
                timestamp: roundData.updatedAt.toNumber(),
            });

            const nextRoundId = roundData.roundId.sub(1);
            
            if (nextRoundId.eq(0)) {
                break;
            }

            roundData = await aggregator.getRoundData(nextRoundId);
            timestamp = moment.unix(roundData.updatedAt.toNumber());
            console.log("got historical price for round " + roundData.roundId.toString() + " at " + timestamp);
        }

        loadingFinished();
        console.log("finished getting historical prices");
    }

}