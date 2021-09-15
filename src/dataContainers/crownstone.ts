import {CloudRequestorInterface} from "../tools/requestors";

export class Crownstone {

  rest : CloudRequestorInterface;
  stoneId = null;

  constructor(cloudRequestor: CloudRequestorInterface, stoneId: string) {
    this.rest = cloudRequestor;
    this.stoneId = stoneId;
  }

  async data(): Promise<cloud_Stone> {
    return await this.rest.getCrownstone(this.stoneId)
  }

  async getCurrentSwitchState() : Promise<number> {
    return this.currentSwitchState();
  }


  async currentSwitchState() : Promise<number> {
    console.log("currentSwitchState is deprecated. Use getCurrentSwitchState instead.")
    let data = await this.rest.getCurrentSwitchState(this.stoneId);
    let switchState = data.switchState || 0;
    if (switchState > 0 && switchState <= 1) { return switchState*100 }
    return data.switchState;
  }


  async setCurrentSwitchState(switchState: number) : Promise<void> {
    await this.rest.setCurrentSwitchState(this.stoneId, switchState);
  }

  async setSwitch(value: number) {
    await this._switch({type:"PERCENTAGE", percentage: value});
  }

  async turnOn() {
    await this._switch({type:"TURN_ON"});
  }

  async turnOff() {
    await this._switch({type:"TURN_OFF"});
  }

  async _switch(switchData : StoneSwitchData) {
    let value = switchData.percentage;

    // normalize value
    if (value) {
      if (value > 0 && value <= 1) {
        value *= 100;
      }
      value = Math.max(0, Math.min(100, value));
    }
    await this.rest.switchCrownstone(this.stoneId, {type: switchData.type, percentage: value})
  }

  async deleteCrownstone() : Promise<Count> {
    return this.rest.deleteCrownstone(this.stoneId);
  }
}