import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan; // ? means that might be undefined

  get client() {
    if (!this._client) {
      throw new Error("Cannnot access NATS client");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    // clusterId is identical to the initial setup in Kubernetes => ' "cid", "ticketing" '

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
