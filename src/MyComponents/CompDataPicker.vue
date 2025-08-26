<script setup>
import { ref, computed, onMounted, watchEffect, onUnmounted, watch } from "vue";
import CompPaginator from "./CompPaginator.vue";

const props = defineProps({
  placeholder: String,
  validate: {
    type: Boolean,
    default: false
  }
})
const date = defineModel()
const container = ref(null);
const input = ref('')
const popoverType = ref(true)
const pageLength = ref(null)
const paginatorPage = ref(pageLength.value)
const minPopoverType = ref(false)
const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());
const currentDay = ref(null)
const yearType = ref(false)
const monthType = ref(false)
const dayOfWeek = ref(null)
const nextDays = ref(null)
const newMonth = ref(null)
const newYear = ref(null)
const defBlur = ref(null)
const focus = ref(false)
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNames = [
  "January", "February", "March", "April", "May", 
  "June", "July", "August", "September", 
  "October", "November", "December"
];
const daysInMonth = computed(() => {
  const startOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const endOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  const lastMonth = new Date(currentYear.value, currentMonth.value, 0);
  const daysOfLastMonth = ref(lastMonth.getDate())
  const days = [];
  const firstDayIndex = startOfMonth.getDay() || 7;
  dayOfWeek.value = firstDayIndex -1
  daysOfLastMonth.value -= firstDayIndex -2  
  for (let i = 1; i < firstDayIndex; i++) {
    days.push(daysOfLastMonth.value++);
  }
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    days.push(i);
  }
  nextDays.value = days.length
  for (let i = 1; i < 42; i++) {
    if (days.length !== 42) days.push(i);
  }
  return days;
});
const monthName = computed(() => monthNames[currentMonth.value]);
const years = [];
let oldLength = ref(0)
const filters = computed(() => {
  return years.slice(oldLength.value * 15, pageLength.value * 15);
});
const computedYear = () => {
  for (let i = 1900; i < currentYear.value; i++) {
    years.push(i)
  }
  for (let i = currentYear.value; i <= 2300; i++) {
    years.push(i)
  }
}
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};
const clickMonth = () => {
  minPopoverType.value = true
  monthType.value = true
  yearType.value = false
}
const clickYear = () => {
  minPopoverType.value = true
  yearType.value = true
  monthType.value = false
}
const selectMonth = (index) => {
  currentMonth.value = index
  minPopoverType.value = false
}
const selectYear = (item) => {
  for (let i = currentYear.value; i > item; i--) {
    currentYear.value--
  }
  for (let i = currentYear.value; i < item; i++) {
    currentYear.value++
  }
  minPopoverType.value = false
}
const isToday = (day) => {
  const today = new Date();
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};
const isClickDay = (day) => {
  return (
    day === currentDay.value &&
    newMonth.value === monthName.value &&
    newYear.value === currentYear.value
  );
};
const selectDate = (day) => {
  if (day) {
    currentDay.value = day
    input.value = `${day} ${monthName.value} ${currentYear.value}`
    newMonth.value = monthName.value
    newYear.value = currentYear.value
    popoverType.value = true
    date.value = input.value
  }else {
    currentDay.value = null
    } 
}
const getYear = () => {
  let yearPageLength = Math.ceil(years.indexOf(currentDate.getFullYear()) / 15)
  paginatorPage.value = yearPageLength
}
const openDate = () => {
  popoverType.value = !popoverType.value 
  minPopoverType.value = false,
  container.value?.focus();
  defBlur.value = false
}
function onBlur() {
  minPopoverType.value = false
}
const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    popoverType.value = true
  }
};
watch(popoverType, (newPopover, oldPopover) => {
  if (newPopover === true) {
    if (input.value.length > 0) {
      focus.value = true
      defBlur.value = null
    }else {
      defBlur.value = true
      focus.value = false
    }
  }
})
watchEffect(() => {
  if (pageLength.value) {
    oldLength.value = pageLength.value -1
  }
})
onMounted(() => {
  computedYear()
  getYear()
  document.addEventListener("click", handleClickOutside);
})
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div>
    <div class="DataPicker">
      <div ref="container" class="dataPicker">
        <button 
          class="openDate" 
          @click="openDate"
          :class="{
            'default_color': input.length < 1, 
            'validate': defBlur || validate, 
            'onFocus': defBlur === false, 
            'offFocus': focus
          }"
        >
          {{ input || placeholder}}
        </button>
        <div 
          class="calendar" 
          :class="{'calendar_popover': popoverType}" 
          @click.stop
        >
          <div class="calendar-header">
            <button @click="prevMonth">
              <i class="bi bi-chevron-left"></i>
            </button>
            <span>
              <b @click="clickMonth">{{ monthName }}</b> 
              <b @click="clickYear">{{ currentYear }}</b>
            </span>
            <button @click="nextMonth">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <div 
            @blur="onBlur"
            class="popover_month_and_year" 
            :class="{'popover_month_and_year_active': !minPopoverType}"
            :tabindex="0"
          >
            <div class="popover_month_and_year_container">
              <h2 
                v-if="monthType" 
                v-for="(item, index) in monthNames" 
                :key="index" @click="selectMonth(index)" 
                :class="{'item_active': item === monthName}" 
                class="item_1"
              >
                {{ item }}
              </h2>
              <h2 
                v-if="yearType" 
                v-for="item in filters" 
                :key="item" 
                @click="selectYear(item)" 
                :class="{'item_active': item === currentYear}" 
                class="item_2"
              >
                {{ item }}
              </h2>
            </div>
            
            <CompPaginator 
              v-if="yearType" 
              v-model="pageLength" 
              :totalItems="years.length" 
              :pageSize="15" 
              :page="paginatorPage" 
              btnClass="paginatorBtn"
            />
          </div>
          <div class="calendar-days">
            <span 
              v-for="day in weekDays" 
              :key="day" 
              class="calendar-day"
            >
              {{ day }}
            </span>
          </div>
          <div class="calendar-grid">
            <span 
              v-for="(day, index) in daysInMonth" 
              :key="index" 
              class="calendar-date"
              :class="{ 
                'is-today': isToday(day), 
                'is_click_day': isClickDay(day), 
                'is_week_end': index < dayOfWeek, 
                'is_week_next': index >= nextDays 
              }"
              @click="
                index >= dayOfWeek && 
                index < nextDays ? 
                selectDate(day) : false"
            >
              {{ day }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>