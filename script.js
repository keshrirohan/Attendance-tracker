let percentage = [50, 60, 70, 75, 80, 85, 90, 95, 100];

const select = document.getElementById("percentageRequired");
percentage.forEach((percent) => {
  const option = document.createElement("option");
  option.value = percent;
  option.textContent = `${percent}%`;
  select.appendChild(option);
});

const form = document.getElementById("percentageForm");
const total_present = document.getElementById("totalPresent");
const totalPresentValue = document.getElementById("totalPresentValue");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedPercentage = Number(select.value);
  const currentAttendance = Number(
    document.getElementById("yourPercentage").value,
  );
  const totalClasses = Number(document.getElementById("totalClass").value);
  totalPresentValue.textContent = `${Math.round((currentAttendance / 100) * totalClasses)} classes`;
  total_present.classList.remove("hidden");

  const present = (currentAttendance / 100) * totalClasses;

  // ✅ Bunk logic
  if (currentAttendance >= selectedPercentage) {
    let bunk = 0;
    let total = totalClasses;
    let attended = present;

    while ((attended / total) * 100 >= selectedPercentage) {
      bunk++;
      total++;
    }

    bunk--; // last invalid remove
    result.textContent = `You can bunk ${bunk} classes`;
    console.log(`You can bunk ${bunk} classes`);
    return;
  }

  // ✅ Required classes logic
  if (currentAttendance < selectedPercentage) {
    let need = 0;
    let total = totalClasses;
    let attended = present;

    while ((attended / total) * 100 < selectedPercentage) {
      need++;
      attended++;
      total++;
    }
    result.textContent = `You need to attend ${need} classes`;
    console.log(`You need to attend ${need} classes`);
    return;
  }
});
