const app = new Vue({
  el: "#app",

  data: {
    welcomeMsg: "Date Calculator",
    currentDate: null,
    dates: "15 28 30",
    modDate: [],
    dateLists: [],
  },

  created() {
    this.currentDate = moment();
    this.calculate();
  },

  methods: {
    calculate() {
      this.dateLists = [];
      this.modDate = this.dates.split(" ");

      this.modDate.forEach((date) => {
        this.dateLists.push({ day: date });
      });
      // this.dateLists = [{ day: 15 }, { day: 28 }, { day: 30 }];
      this.dateLists.forEach((date) => {
        date.date = moment().subtract(date.day - 1, "days");
      });
    },
  },
});
