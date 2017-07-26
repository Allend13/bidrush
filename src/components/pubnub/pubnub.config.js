const pubnubConfig = {
  publishKey: 'pub-c-75686720-d67e-468c-8051-a5b7679c762c',
  subscribeKey: 'sub-c-a6e090fc-e6a4-11e5-a027-0619f8945a4f',
}

if (process.env.NODE_ENV === 'production') {
  pubnubConfig.ssl = true
}

export default pubnubConfig
