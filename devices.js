function Device(deviceName, size, tag) {
  this.deviceName = deviceName;
  this.size = size;
  this.tag = tag;
}

var devices = {
  mobile:  new Device('mobile', '450x796', ['mobile']),
  tablet: new Device('tablet', '768x1024', ['tablet']),
  desktop: new Device('desktop', '1920x1080', ['desktop'])
};
