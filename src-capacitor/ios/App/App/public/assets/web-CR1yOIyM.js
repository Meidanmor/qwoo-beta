import { W as WebPlugin } from "./index-DDAg5YDa.js";
import "./quasar-observers-delayed-tSHCOYpR.js";
class AppWeb extends WebPlugin {
  constructor() {
    super();
    this.handleVisibilityChange = () => {
      const data = {
        isActive: document.hidden !== true
      };
      this.notifyListeners("appStateChange", data);
      if (document.hidden) {
        this.notifyListeners("pause", null);
      } else {
        this.notifyListeners("resume", null);
      }
    };
    document.addEventListener("visibilitychange", this.handleVisibilityChange, false);
  }
  exitApp() {
    throw this.unimplemented("Not implemented on web.");
  }
  async getInfo() {
    throw this.unimplemented("Not implemented on web.");
  }
  async getLaunchUrl() {
    return { url: "" };
  }
  async getState() {
    return { isActive: document.hidden !== true };
  }
  async minimizeApp() {
    throw this.unimplemented("Not implemented on web.");
  }
  async toggleBackButtonHandler() {
    throw this.unimplemented("Not implemented on web.");
  }
}
export {
  AppWeb
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLUNSMXlPSXlNLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9hcHAvZGlzdC9lc20vd2ViLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5leHBvcnQgY2xhc3MgQXBwV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpc0FjdGl2ZTogZG9jdW1lbnQuaGlkZGVuICE9PSB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCdhcHBTdGF0ZUNoYW5nZScsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCdwYXVzZScsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoJ3Jlc3VtZScsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XG4gICAgfVxuICAgIGV4aXRBcHAoKSB7XG4gICAgICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0SW5mbygpIHtcbiAgICAgICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICAgIH1cbiAgICBhc3luYyBnZXRMYXVuY2hVcmwoKSB7XG4gICAgICAgIHJldHVybiB7IHVybDogJycgfTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7IGlzQWN0aXZlOiBkb2N1bWVudC5oaWRkZW4gIT09IHRydWUgfTtcbiAgICB9XG4gICAgYXN5bmMgbWluaW1pemVBcHAoKSB7XG4gICAgICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgICB9XG4gICAgYXN5bmMgdG9nZ2xlQmFja0J1dHRvbkhhbmRsZXIoKSB7XG4gICAgICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWIuanMubWFwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ08sTUFBTSxlQUFlLFVBQVU7QUFBQSxFQUNsQyxjQUFjO0FBQ1YsVUFBSztBQUNMLFNBQUsseUJBQXlCLE1BQU07QUFDaEMsWUFBTSxPQUFPO0FBQUEsUUFDVCxVQUFVLFNBQVMsV0FBVztBQUFBLE1BQzlDO0FBQ1ksV0FBSyxnQkFBZ0Isa0JBQWtCLElBQUk7QUFDM0MsVUFBSSxTQUFTLFFBQVE7QUFDakIsYUFBSyxnQkFBZ0IsU0FBUyxJQUFJO0FBQUEsTUFDdEMsT0FDSztBQUNELGFBQUssZ0JBQWdCLFVBQVUsSUFBSTtBQUFBLE1BQ3ZDO0FBQUEsSUFDSjtBQUNBLGFBQVMsaUJBQWlCLG9CQUFvQixLQUFLLHdCQUF3QixLQUFLO0FBQUEsRUFDcEY7QUFBQSxFQUNBLFVBQVU7QUFDTixVQUFNLEtBQUssY0FBYyx5QkFBeUI7QUFBQSxFQUN0RDtBQUFBLEVBQ0EsTUFBTSxVQUFVO0FBQ1osVUFBTSxLQUFLLGNBQWMseUJBQXlCO0FBQUEsRUFDdEQ7QUFBQSxFQUNBLE1BQU0sZUFBZTtBQUNqQixXQUFPLEVBQUUsS0FBSyxHQUFFO0FBQUEsRUFDcEI7QUFBQSxFQUNBLE1BQU0sV0FBVztBQUNiLFdBQU8sRUFBRSxVQUFVLFNBQVMsV0FBVyxLQUFJO0FBQUEsRUFDL0M7QUFBQSxFQUNBLE1BQU0sY0FBYztBQUNoQixVQUFNLEtBQUssY0FBYyx5QkFBeUI7QUFBQSxFQUN0RDtBQUFBLEVBQ0EsTUFBTSwwQkFBMEI7QUFDNUIsVUFBTSxLQUFLLGNBQWMseUJBQXlCO0FBQUEsRUFDdEQ7QUFDSjsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
