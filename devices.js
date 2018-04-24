function Device(deviceName, size, tag) {
    this.deviceName = deviceName;
    this.size = size;
    this.tag = tag;
}

var devices = {
    mobile:  new Device('mobile', '450x796', ['mobile']),
    desktop: new Device('desktop', '1980x1080', ['desktop'])
};
