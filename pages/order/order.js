Page({
  data: {
    allBottomColor:"red",
    waitBottomColor:"white"
  },
  allOrder:function() {
    this.setData({
      allBottomColor: "red",
      waitBottomColor: "white"
    });
  },
  allOrder2: function () {
    this.setData({
      allBottomColor : "white",
      waitBottomColor: "red"
    });
  }
})