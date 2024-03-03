import { TokenStore }           from "./tokens";
import { CacheStorage }         from "./cache";
import { Util }                 from "../util/Util";

import { RequestorBase }        from "./requestorBase";
import { CrownstoneRequests }   from "./requests/crownstoneRequests";
import { SphereRequests }       from "./requests/sphereRequests";
import { UserRequests }         from "./requests/userRequests";
import { HubRequests }          from "./requests/hubRequests";
import { LocationRequests}      from "./requests/locationRequests";
import { WebhookRequests }      from "./requests/webhookRequests";

import { SphereV2Requests }     from "./requests/nextCloud/sphereV2Requests";
import { CrownstoneV2Requests } from "./requests/nextCloud/crownstoneV2Requests";



export class CloudRequestor extends RequestorBase {

  constructor(tokenStore: TokenStore, cache: CacheStorage, customEndpoint: string = 'https://cloud.ownstone.org/api/') {
    super(tokenStore, cache);
    this.setEndpoint(customEndpoint);
  }


  isUser() : boolean {
    return this.tokenStore.cloudUser.userId !== undefined;
  }

  isHub() : boolean {
    return this.tokenStore.cloudHub.hubToken !== undefined;
  }

  interface() : CloudRequestorInterface {
    // @ts-ignore
    return this;
  }
}


export class CloudRequestorV2 extends RequestorBase {

  constructor(tokenStore: TokenStore, cache: CacheStorage, customEndpoint: string = 'https://next.ownstone.org/api/') {
    super(tokenStore, cache);
    this.setEndpoint(customEndpoint);
  }


  isUser() : boolean {
    return this.tokenStore.cloudUser.userId !== undefined;
  }

  isHub() : boolean {
    return this.tokenStore.cloudHub.hubToken !== undefined;
  }

  interface() : CloudRequestorInterface {
    // @ts-ignore
    return this;
  }
}


export interface CloudRequestorInterface extends CloudRequestor,
                                                 SphereRequests,
                                                 CrownstoneRequests,
                                                 LocationRequests,
                                                 UserRequests,
                                                 HubRequests,
                                                 SphereV2Requests,
                                                 CrownstoneV2Requests {}

Util.applyMixins(CloudRequestor, [
  UserRequests,
  LocationRequests,
  HubRequests,
  SphereRequests,
  CrownstoneRequests
])

Util.applyMixins(CloudRequestorV2, [
  SphereV2Requests,
  CrownstoneV2Requests
])


export class WebhookRequestor extends RequestorBase {

  constructor(tokenStore: TokenStore, cache: CacheStorage, customEndpoint: string = 'https://webhooks.ownstone.org/api/') {
    super(tokenStore, cache);
    this.setEndpoint(customEndpoint);
  }

  interface() : WebhookRequestorInterface {
    // @ts-ignore
    return this;
  }
}

export interface WebhookRequestorInterface extends WebhookRequestor,
  WebhookRequests {}

Util.applyMixins(WebhookRequestor, [
  WebhookRequests,
])
