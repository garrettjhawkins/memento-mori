export const useUserStore = defineStore("user", () => {
  // Using Composition API style (setup store)
  const username = ref("Guest");
  const isLoggedIn = ref(false);

  function login(name: string) {
    username.value = name;
    isLoggedIn.value = true;
  }

  function logout() {
    username.value = "Guest";
    isLoggedIn.value = false;
  }

  return {
    username,
    isLoggedIn,
    login,
    logout,
  };
});
