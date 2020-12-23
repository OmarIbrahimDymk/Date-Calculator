const app = new Vue({
  el: "#app",

  data: {
    welcomeMsg: "Date Calculator",
    currentDate: null,
    dates: "15 28 30",
    modDate: [],
    dateLists: [],
    days: [],
    penaltyRule: 15,
    incorporationDate: null,
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },

  created() {
    this.currentDate = moment();
    this.incorporationDate = moment();
    this.calculate();
  },

  methods: {
    calculate() {
      this.dateLists = [];
      this.modDate = this.dates.split(" ");

      this.modDate.forEach((date) => {
        if (Number.isInteger(+date)) {
          this.dateLists.push({ day: date });
        }
      });
      // this.dateLists = [{ day: 15 }, { day: 28 }, { day: 30 }];
      this.dateLists.forEach((date) => {
        date.date = moment().subtract(date.day - 1, "days");
      });
    },
  },

  computed: {
    GetDays() {
      let currentMonthDay = moment().daysInMonth();

      let firstDayWithoutPenalty = moment().subtract(
        this.penaltyRule - 1,
        "days"
      );

      let months = [];
      for (let index = -49; index < 21; index++) {
        let day = moment().add(index, "days");
        months.push({
          date: day,
          day: `${day.dates()} - ${this.monthNames[day.month()]}`,
          isToday: day.isSame(moment()),
          isPenalty: day.isBefore(firstDayWithoutPenalty),
          isNoPenalty: day.isSameOrAfter(firstDayWithoutPenalty),
        });
      }
      return months;
    },
    GetDate() {
      return (momentDate, add = 0, type = "days") => {
        return `${this[momentDate].add(add, type).date()} / ${
          this.monthNames[this[momentDate].month()]
        } / ${this[momentDate].year()}`;
      };
    },
  },
});
