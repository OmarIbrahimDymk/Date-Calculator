const ref = Vue.ref;
const computed = Vue.computed;
const monthNames = [
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
];

const app = Vue.createApp({
  setup() {
    const welcomeMsg = ref("Date Calculator");
    const currentDate = ref(moment());
    const dates = ref("15 28 30");
    const modDate = ref([]);
    const dateLists = ref([]);
    const days = ref([]);
    const penaltyRule = ref(15);

    const calculate = () => {
      dateLists.value = [];
      modDate.value = dates.value.split(" ");

      modDate.value.forEach((date) => {
        if (Number.isInteger(+date)) {
          dateLists.value.push({ day: date });
        }
      });

      dateLists.value.forEach((date) => {
        date.date = moment().subtract(date.day - 1, "days");
      });
    };

    const GetDays = computed(() => {
      let firstDayWithoutPenalty = moment().subtract(
        penaltyRule.value - 1,
        "days"
      );

      let months = [];
      for (let index = -49; index < 21; index++) {
        let day = moment().add(index, "days");
        months.push({
          date: day,
          day: `${day.date()} - ${monthNames[day.month()]}`,
          isToday: day.isSame(moment()),
          isPenalty: day.isBefore(firstDayWithoutPenalty),
          isNoPenalty: day.isSameOrAfter(firstDayWithoutPenalty),
        });
      }
      return months;
    });

    calculate();
    return {
      welcomeMsg,
      currentDate,
      dates,
      modDate,
      dateLists,
      days,
      penaltyRule,
      GetDays,
      calculate,
    };
  },
});

app.mount("#app");
