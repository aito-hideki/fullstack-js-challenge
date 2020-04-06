export default {
  logged: (state: any) => !!state.profile,
  isAdmin: (state: any) => !!state.profile && state.profile.isAdmin
}
