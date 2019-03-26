var elementResizeDetectorMaker = require("element-resize-detector");
// 表格高度自适应
export const tableHeight = {
	// vue中组件是在mounted后才挂载到dom上的，所以在组件中我们也要在mounted后才能调用该方法监听元素的大小。
    mounted () {
        let erd;
        let $el;
        // 需引入第三方js库element-resize-detector 跨浏览器的调整元素的侦听器
        // 创建一个全局函数elementResizeDetectorMaker，它是元素调整大小检测器制造商函数的实例。
        // 基于对象的方法，将在v2中删除。
        erd = elementResizeDetectorMaker();
        // 采用超快速滚动方式，v2中的默认值。
        // var erdUltraFast = elementResizeDetectorMaker({
        //     strategy: "scroll"
        // });

        // listenTo(element, listener)。element为侦听resize事件的元素，listener是resize事件的监听器函数，element会作为参数传给listener。
        erd.listenTo(this.$el, element => {
            $el = element;
            // 节流函数，this.setHeight在200ms内只会调用一次。(下面还会展开说）
            // util.throttle(setHeight.bind(this));
        });
        // 设置高度
        function setHeight () {
            // 表格高度为元素offsetHeight-48，其中这个offset高度为 content + padding + border 的高度。
            // 一般我们获取到表格的父元素的高度，然后把该高度给表格。
            this.tableHeight = $el.offsetHeight;
        }
    }
};