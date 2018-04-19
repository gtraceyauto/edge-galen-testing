function Device(deviceName, size, tags) {
    this.deviceName = deviceName;
    this.size = size;
    this.tags = tags;
}

var devices = {
    mobile:  new Device('mobile', '450x796', ['mobile']),
    desktop: new Device('desktop', '1366x768', ['desktop'])
};
