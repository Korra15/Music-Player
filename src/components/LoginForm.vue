<template>
  <!-- Login Form -->
  <div class="text-white text-center font-bold p-4 mb-4" v-if="loginShowAlert"
   :class="loginAlertVariant">
   {{ loginAlertMsg }}
  </div>
  <vee-form :validation-schema="loginSchema"
    @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button type="submit" :disabled="loginInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700" >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
      loginInSubmission: false, // keeps track of is the login form in submission or not
      // disable the button while the form is submitting the data - prevent excessive requests
      loginShowAlert: false,
      // used to toggle the alerts visibility
      loginAlertVariant: 'bg-blue-500', // to indicate that form submission is in progress
      // change the color of the alert
      loginAlertMsg: 'Please Wait! We are loggin you in',
      // The message inside the alert
    };
  },
  methods: {
    async login(values) {
      this.loginInSubmission = true;
      this.loginShowAlert = true;
      this.loginAlertVariant = 'bg-blue-500';
      this.loginAlertMsg = 'Please Wait! We are loggin you in';

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.loginInSubmission = false;
        this.loginAlertVariant = 'bg-red-500';
        this.loginAlertMsg = 'Invalid login details';
        return;
      }

      this.loginAlertVariant = 'bg-green-500';
      this.loginAlertMsg = 'Success! You are now logged in';
      // console.log(values);

      window.location.reload();
    },
  },

};
</script>
