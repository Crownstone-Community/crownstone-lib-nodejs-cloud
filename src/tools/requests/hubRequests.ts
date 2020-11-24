import {RequestorBase} from "../requestorBase";
import {req} from "../../util/request";

export class HubRequests extends RequestorBase {

  async hubLogin() : Promise<cloud_LoginReply> {
    const {body} = await req("POST",`${this.endpoint}Hubs/${this.tokenStore.cloudHub.hubId}/login`, {
      searchParams: {
        token: this.tokenStore.cloudHub.hubToken
      },
      responseType: 'json'
    });
    return body;
  }

  async hubSetLocalIpAddress(ipaddress) : Promise<void> {
    await req("PUT", `${this.endpoint}Hubs/${this.tokenStore.cloudHub.hubId}/localIP`, this.addSecurity({ searchParams: {localIpAddress: ipaddress} }));
  }

  async getHub() : Promise<cloud_Hub> {
    const {body} = await req("GET", `${this.endpoint}Hubs/${this.tokenStore.cloudHub.hubId}`, this.addSecurity({}));
    return body as cloud_Hub;
  }

  async getHubs() : Promise<cloud_Hub[]> {
    const {body} = await req("GET", `${this.endpoint}Hubs/`, this.addSecurity({}));
    return body as cloud_Hub[];
  }
}