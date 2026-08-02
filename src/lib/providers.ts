export type ProviderResult = {
  externalId: string;
  status: "TEST_PENDING" | "TEST_FAILED";
};
export interface PaymentProvider {
  createPayment(
    orderId: string,
    amount: number,
    idempotencyKey: string,
  ): Promise<ProviderResult>;
  verifyWebhook(payload: string, signature: string): boolean;
}
export interface DigitalGoodsProvider {
  fulfill(orderId: string, idempotencyKey: string): Promise<ProviderResult>;
}
export class MockPaymentProvider implements PaymentProvider {
  private requests = new Map<string, ProviderResult>();
  async createPayment(orderId: string, _amount: number, key: string) {
    const existing = this.requests.get(key);
    if (existing) return existing;
    const result: ProviderResult = {
      externalId: `mock-pay-${orderId}`,
      status: "TEST_PENDING",
    };
    this.requests.set(key, result);
    return result;
  }
  verifyWebhook(_payload: string, signature: string) {
    return signature === "mock-valid";
  }
}
export class MockDigitalGoodsProvider implements DigitalGoodsProvider {
  async fulfill(orderId: string, key: string): Promise<ProviderResult> {
    void key;
    return { externalId: `mock-goods-${orderId}`, status: "TEST_PENDING" };
  }
}
