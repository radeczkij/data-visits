const data = [
  {
    from: "2023-05-30T05:56:28+00:00",
    to: "2023-05-30T05:57:10+00:00",
  },
  {
    from: "2023-05-30T06:01:01+00:00",
    to: "2023-05-30T06:49:31+00:00",
  },
  {
    from: "2023-05-30T07:04:21+00:00",
    to: "2023-05-30T07:05:26+00:00",
  },
  {
    from: "2023-05-30T08:27:42+00:00",
    to: "2023-05-30T08:28:52+00:00",
  },
  {
    from: "2023-05-30T08:29:43+00:00",
    to: "2023-05-30T08:31:28+00:00",
  },
  {
    from: "2023-05-30T10:19:15+00:00",
    to: "2023-05-30T10:21:02+00:00",
  },
  {
    from: "2023-05-30T16:50:26+00:00",
    to: "2023-05-30T16:50:49+00:00",
  },
  {
    from: "2023-05-30T17:03:12+00:00",
    to: "2023-05-30T17:04:24+00:00",
  },
  {
    from: "2023-05-30T17:05:11+00:00",
    to: "2023-05-30T17:05:55+00:00",
  },
  {
    from: "2023-05-30T19:29:46+00:00",
    to: "2023-05-30T19:31:04+00:00",
  },
  {
    from: "2023-05-30T20:42:28+00:00",
    to: "2023-05-30T20:43:31+00:00",
  },
];

const days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

const dateVisits = document.createElement("div");
dateVisits.classList.add("date-visits");
container.append(dateVisits);

const hourScale = document.createElement("div");
hourScale.classList.add("hour-scale");

for (let i = 0; i <= 24; i += 3) {
  const hourDiv = document.createElement("div");
  hourDiv.classList.add("hour");
  hourDiv.textContent = i.toString().padStart(2, "0") + ":00";
  hourScale.appendChild(hourDiv);
}

container.append(hourScale);

const line = document.createElement("div");
line.classList.add("line");
container.append(line);

const date = document.createElement("div");
const currentDate = new Date(data[0].from);
date.innerHTML = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
  months[currentDate.getMonth()]
}`;
dateVisits.append(date);

const visits = document.createElement("div");
visits.innerHTML = `${data.length} visits`;
dateVisits.append(visits);

function getDate(index, key) {
  return (
    (new Date(data[index][key]).getHours() - 3) * 3600 +
    new Date(data[index][key]).getMinutes() * 60 +
    new Date(data[index][key]).getSeconds()
  );
}

const dayInSec = 86400;
function activityScale(data) {
  for (let i = 0; i < data.length; i++) {
    const ball = document.createElement("div");
    const space = document.createElement("div");
    const rightSpace = document.createElement("div");
    const dataFrom = getDate(i, "from");

    const percentSpace = ((dataFrom * 100) / dayInSec).toFixed(2);
    if (i === 0) {
      space.classList.add("space");
      space.style.width = `${percentSpace}%`;
      line.appendChild(space);
      ball.classList.add("ball");
      line.appendChild(ball);
      continue;
    }
    const prevDataTo = getDate(i - 1, "to");

    if (dataFrom - prevDataTo < 900) {
      const marginLeft = ((dataFrom - prevDataTo) * 100) / dayInSec;
      ball.classList.add("ball");
      // У data є сценарій, де різниця візитів складає меньше 1 хв,
      // тому я за основу, коли кулька наїжджає на другу кульку, взяв 2%,
      // щоб вони не злиплись в одну і юзер бачив, що візит відбувався
      ball.style.marginLeft = `-${2 - marginLeft}%`;
      line.append(ball);
      continue;
    }
    const spaceBetweenBall =
      (dataFrom * 100) / dayInSec - (prevDataTo * 100) / dayInSec;
    space.classList.add("space");
    space.style.width = `${spaceBetweenBall}%`;
    line.append(space);
    ball.classList.add("ball");
    line.append(ball);

    if (i === data.length - 1) {
      const spaceBetweenBall = 100 - (dataFrom * 100) / dayInSec;
      rightSpace.classList.add("space");
      rightSpace.style.width = `${spaceBetweenBall}%`;
      line.append(rightSpace);
    }
  }
}
activityScale(data);
