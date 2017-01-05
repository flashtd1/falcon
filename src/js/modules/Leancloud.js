export default {
	init: (appId, appKey, master) => {
		let initOpt = {
			appId: appId,
		 	appKey: appKey
		}

		if(master) {
			initOpt.masterKey = master
		}
		
		AV.init(initOpt)
	}
}