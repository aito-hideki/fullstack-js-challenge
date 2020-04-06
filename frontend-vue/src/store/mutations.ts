export default {
  toggleDrawer: (state: any) => {
    state.drawer = !state.drawer
  },
  setDrawer: (state: any, drawer: boolean) => {
    state.drawer = drawer
  }
}
