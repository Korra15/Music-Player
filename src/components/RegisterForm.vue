<template>
  <!-- Registration Form -->
  <div class="text-white text-center font-bold p-5 mb-4"
    v-if="regShowAlert" :class="regAlertVariant"> <!-- tailwind classes-->
    {{ regAlertMsg}}
  </div> <!-- tailwind classes-->
  <vee-form :validation-schema="schema"
    @submit="register" :initialValues="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field type="text" name='name'
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name" />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field type="number" name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded" />
      <error-message class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">

        <!-- the field property is an object with the
        features for adding validation to an input -->
        <input class="block w-full py-1.5 px-3 text-gray-800 border
          border-gray-300 transition duration-500 focus:outline-none
          focus:border-black rounded" type="password"
          placeholder="Password" v-bind="field" />

        <!-- to display the errors -->
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <!-- <error-message class="text-red-600" name="password" /> -->
    </div>

    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field name="confirmPassword" class="block w-full py-1.5 px-3 text-gray-800 border
        border-gray-300 transition
        duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" type="password" />
      <error-message class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
        <option value="India">India</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="China">China</option>
        <!-- we change the name as wee-field generates an input tag by-default -->
      </vee-field>
      <error-message class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field type="checkbox" name="tos" value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <i18n-t class="inline-block" keypath="register.accept" tag="label" for="TOS">
        <a href="#"> {{ $t('register.TOS') }} </a>
      </i18n-t>
      <error-message class="text-red-600 block" name="tos" />
    </div>
    <!-- submit button -->
    <button type="submit" :disabled="regInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:100|alphaSpaces', // value must be a string with the rules we want to enforce
        email: 'required|min:3|max:100|email',
        age: 'required|minVal:18|maxVal:120',
        password: 'required|min:3|max:32',
        confirmPassword: 'required|passwordsMismatch:@password',
        country: 'required|countryExcluded:China,Artic',
        tos: 'tos',
      },
      userData: { // for initial values
        country: 'India',
      },
      regInSubmission: false, // keeps track of is the registration form in submission or not
      regShowAlert: false,
      regAlertVariant: 'bg-blue-500', // to indicate that form submission is in progress
      regAlertMsg: 'Please Wait! Your account is being created',
    };
  },
  methods: {
    async register(values) {
      this.regShowAlert = true;
      this.regInSubmission = true;
      this.regAlertVariant = 'bg-blue-500';
      this.regAlertMsg = 'Please Wait! Your account is being created';

      try {
        await this.$store.dispatch('register', values);
        // this function will run a function inside the actions obj of the store
        // code inside this action function = asynchronous
        /*  2 args = action function name and
            data (payload that will be passed on to the function(optional)) */
      } catch (error) {
        this.regInSubmission = false;
        this.regAlertVariant = 'bg-red-500';
        this.regAlertMsg = 'An unexpected error occured. Please try again later.';
        return; // stop the function from executing further
      }

      this.regAlertVariant = 'bg-green-500';
      this.regAlertMsg = 'Success! Your account has been created';

      window.location.reload();
      // window.location = global Js object defined by the browser
      // reload method will refresh the page
    },
  },
};
</script>
