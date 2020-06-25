import { cloudApiBase, TokenStore } from "./cloudApiBase";
import { REST } from "../cloudAPI";

export const stones : stones = {
  /**
   * Create a crownstone in the cloud so the major and minor can be generated
   * @param data
   * @param background
   * @returns {*}
   */
  createStone: function(data : any, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Spheres/{id}/ownedStones/',
      {data:data, background: background},
      'body'
    );
  },


  /**
   * Update a crownstone in the cloud
   * @param localStoneId
   * @param data
   * @param background
   * @returns {*}
   */
  updateStone: function(cloudStoneId, data, background = true) {
    return cloudApiBase._setupRequest(
      'PUT',
      '/Spheres/{id}/ownedStones/' + cloudStoneId,
      {background: background, data: data},
      'body'
    );
  },

  /**
   * Update a crownstone in the cloud
   * @param switchState
   * @param background
   * @returns {*}
   */
  updateStoneSwitchState: function(switchState, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Stones/{id}/currentSwitchState?switchState='  + switchState,
      {background: background},
      'body'
    );
  },

  /**
   * Update a current energy usage
   * @param data
   * @param background
   * @returns {*}
   */
  updatePowerUsage: function(data, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Stones/{id}/currentPowerUsage/',
      { background: background, data: data },
      'body'
    );
  },

  /**
   * Update a current energy usage
   * @param data
   * @param background
   * @returns {*}
   */
  updateBatchPowerUsage: function(data : any[], background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Stones/{id}/batchPowerUsage/',
      { background: background, data: data },
      'body'
    );
  },


  /**
   * !
   * !
   * ! ------------- DEPRECATED -----------------
   * !
   * !
   * Update the link from a crownstone to a room.
   * @param localLocationId
   * @param localSphereId
   * @param updatedAt
   * @param background
   * @param doNotSetUpdatedTimes
   * @returns {*}
   */
  updateStoneLocationLink: function(cloudLocationId, localSphereId, updatedAt, background = true, doNotSetUpdatedTimes = false) {
    return cloudApiBase._setupRequest(
        'PUT',
        '/Stones/{id}/locations/rel/' + cloudLocationId,
        {background: background},
      )
      .then(() => {
        if (doNotSetUpdatedTimes !== true) {
          let promises = [];
          promises.push(REST.forSphere(localSphereId).updateStone(TokenStore.stoneId,{locationId: cloudLocationId, updatedAt: updatedAt}));
          promises.push(REST.forSphere(localSphereId).updateLocation(cloudLocationId,   {updatedAt: updatedAt}));
          // we set the updatedAt time in the cloud since changing the links does not update the time there
          return Promise.all(promises);
        }
      })
  },


  /**
   * !
   * !
   * ! ------------- DEPRECATED -----------------
   * !
   * !
   * Delete the link from a crownstone to a room.
   * @param localLocationId
   * @param localSphereId
   * @param updatedAt
   * @param background
   * @returns {*}
   */
  deleteStoneLocationLink: function(cloudLocationId, localSphereId, updatedAt, background = true) {
    return cloudApiBase._setupRequest(
        'DELETE',
        '/Stones/{id}/locations/rel/' + cloudLocationId,
        {background: background},
      )
      .then(() => {
        let promises = [];
        promises.push(REST.forSphere(localSphereId).updateStone(TokenStore.stoneId,{updatedAt: updatedAt}));
        promises.push(REST.forSphere(localSphereId).updateLocation(cloudLocationId,   {updatedAt: updatedAt}));
        // we set the updatedAt time in the cloud since changing the links does not update the time there
        return Promise.all(promises);
      })
  },




  /**
   * request the data of all crownstones in this sphere
   * @returns {*}
   */
  getStonesInSphere: function(background = true) {
    return cloudApiBase._setupRequest(
      'GET',
      '/Spheres/{id}/ownedStones',
      {background: background, data: {filter:{"include":["locations", {"abilities":"properties"}, "behaviours"]}}}
    );
  },


  /**
   * request the data from this crownstone in the cloud
   * @param localStoneId  database id of crownstone
   * @returns {*}
   */
  getStone: function(cloudStoneId) {
    return cloudApiBase._setupRequest(
      'GET',
      '/Stones/' + cloudStoneId
    );
  },


  /**
   * search for crownstone with this mac address
   * @param address  mac address
   * @returns {*}
   */
  findStone: function(address) {
    return cloudApiBase._setupRequest(
      'GET',
      '/Spheres/{id}/ownedStones/',
      {data:{filter:{where:{address:address}}}},
      'query'
    );
  },

  /**
   * Delete the data from this crownstone in the cloud in case of a failed setup or factory reset.
   * stoneId  database id of crownstone
   * @returns {*}
   */
  deleteStone: function(cloudStoneId) {
    if (cloudStoneId) {
      return cloudApiBase._setupRequest(
        'DELETE',
        '/Spheres/{id}/ownedStones/' + cloudStoneId
      );
    }
  },



  sendStoneDiagnosticInfo: function(data, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Stones/{id}/diagnostics',
      { background: background, data: data },
      'body'
    );
  }


};