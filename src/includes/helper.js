// purpose of helper file = store utility functions
// for assisting us with basic tasks

export default {
  formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    // if calculation results in undefined or nan set it to 0
    const seconds = Math.round(time - minutes * 60) || 0;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    // literal string = ``
    // 1st half = display the no. of minutes in the song
    // 2nd half = ternary operator used to check if the seconds var is less than 10
    // if yes - we add a zero before adding the number of seconds
    // if no - nothing is added
  },
};
