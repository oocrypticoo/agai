import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");

  if (!year) {
    return NextResponse.json({ error: "Missing year" }, { status: 400 });
  }

  // const from = new Date(`${year}-01-01`);
  // const to = new Date(`${year}-12-31`);

  // console.log(process.env.GITHUB_TOKEN);
  // console.log(process.env.HANDLE);

  // const query = `
  //   query($username: String!, $from: DateTime!, $to: DateTime!) {
  //     user(login: $username) {
  //       contributionsCollection(from: $from, to: $to) {
  //         contributionCalendar {
  //           totalContributions
  //           weeks {
  //             contributionDays {
  //               date
  //               contributionCount
  //               color
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `;

  try {
    // const response = await fetch("https://api.github.com/graphql", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query,
    //     variables: { username: process.env.HANDLE, from, to },
    //   }),
    // });

    //const data = await response.json();

    if (year === "2025") return NextResponse.json(twentyFive, { status: 200 });
    if (year === "2024") return NextResponse.json(twentyFour, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

const twentyFive = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 16356,
          weeks: [
            {
              contributionDays: [
                {
                  date: "2025-01-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-01-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-07",
                  contributionCount: 12,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-08",
                  contributionCount: 67,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-09",
                  contributionCount: 20,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-10",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-11",
                  contributionCount: 4,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-01-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-01-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-24",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-01-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-27",
                  contributionCount: 6,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-01-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-01",
                  contributionCount: 19,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-02-02",
                  contributionCount: 10,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-08",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-02-09",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-13",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-15",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-02-16",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-02-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-02-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-03-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-03-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-15",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-03-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-03-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-03-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-03-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-02",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-04-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-08",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-04-13",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-14",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-18",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2025-04-19",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-04-20",
                  contributionCount: 43,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-21",
                  contributionCount: 29,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-22",
                  contributionCount: 60,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-23",
                  contributionCount: 68,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-24",
                  contributionCount: 21,
                  color: "#9be9a8",
                },
                {
                  date: "2025-04-25",
                  contributionCount: 48,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-26",
                  contributionCount: 5,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-04-27",
                  contributionCount: 9,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-28",
                  contributionCount: 33,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-29",
                  contributionCount: 33,
                  color: "#ebedf0",
                },
                {
                  date: "2025-04-30",
                  contributionCount: 36,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-01",
                  contributionCount: 40,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-02",
                  contributionCount: 55,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-03",
                  contributionCount: 20,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-05-04",
                  contributionCount: 20,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-05",
                  contributionCount: 20,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-06",
                  contributionCount: 38,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-07",
                  contributionCount: 4,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-08",
                  contributionCount: 7,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-09",
                  contributionCount: 18,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-05-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-13",
                  contributionCount: 13,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-15",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-16",
                  contributionCount: 72,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-17",
                  contributionCount: 652,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-05-18",
                  contributionCount: 277,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-19",
                  contributionCount: 192,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-20",
                  contributionCount: 227,
                  color: "#9be9a8",
                },
                {
                  date: "2025-05-21",
                  contributionCount: 217,
                  color: "#9be9a8",
                },
                {
                  date: "2025-05-22",
                  contributionCount: 185,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-23",
                  contributionCount: 311,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-24",
                  contributionCount: 307,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-05-25",
                  contributionCount: 335,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-26",
                  contributionCount: 189,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-27",
                  contributionCount: 244,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-28",
                  contributionCount: 237,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-29",
                  contributionCount: 187,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-30",
                  contributionCount: 213,
                  color: "#ebedf0",
                },
                {
                  date: "2025-05-31",
                  contributionCount: 183,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-06-01",
                  contributionCount: 317,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-02",
                  contributionCount: 204,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-03",
                  contributionCount: 138,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-04",
                  contributionCount: 117,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-05",
                  contributionCount: 291,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-06",
                  contributionCount: 193,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-07",
                  contributionCount: 339,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-06-08",
                  contributionCount: 229,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-09",
                  contributionCount: 121,
                  color: "#9be9a8",
                },
                {
                  date: "2025-06-10",
                  contributionCount: 93,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-11",
                  contributionCount: 115,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-12",
                  contributionCount: 135,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-13",
                  contributionCount: 184,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-14",
                  contributionCount: 153,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-06-15",
                  contributionCount: 165,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-16",
                  contributionCount: 129,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-17",
                  contributionCount: 114,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-18",
                  contributionCount: 102,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-19",
                  contributionCount: 147,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-20",
                  contributionCount: 124,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-21",
                  contributionCount: 85,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-06-22",
                  contributionCount: 78,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-23",
                  contributionCount: 127,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-24",
                  contributionCount: 102,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-25",
                  contributionCount: 123,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-26",
                  contributionCount: 120,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-27",
                  contributionCount: 117,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-28",
                  contributionCount: 141,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-06-29",
                  contributionCount: 151,
                  color: "#ebedf0",
                },
                {
                  date: "2025-06-30",
                  contributionCount: 111,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-01",
                  contributionCount: 103,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-02",
                  contributionCount: 76,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-03",
                  contributionCount: 105,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-04",
                  contributionCount: 147,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-05",
                  contributionCount: 111,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-07-06",
                  contributionCount: 154,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-07",
                  contributionCount: 54,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-08",
                  contributionCount: 125,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-09",
                  contributionCount: 132,
                  color: "#40c463",
                },
                {
                  date: "2025-07-10",
                  contributionCount: 93,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-11",
                  contributionCount: 118,
                  color: "#30a14e",
                },
                {
                  date: "2025-07-12",
                  contributionCount: 111,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-07-13",
                  contributionCount: 156,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-14",
                  contributionCount: 109,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-15",
                  contributionCount: 143,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-16",
                  contributionCount: 114,
                  color: "#9be9a8",
                },
                {
                  date: "2025-07-17",
                  contributionCount: 132,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-18",
                  contributionCount: 117,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-19",
                  contributionCount: 156,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-07-20",
                  contributionCount: 82,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-21",
                  contributionCount: 93,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-22",
                  contributionCount: 93,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-23",
                  contributionCount: 102,
                  color: "#9be9a8",
                },
                {
                  date: "2025-07-24",
                  contributionCount: 99,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-25",
                  contributionCount: 91,
                  color: "#40c463",
                },
                {
                  date: "2025-07-26",
                  contributionCount: 121,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-07-27",
                  contributionCount: 78,
                  color: "#ebedf0",
                },
                {
                  date: "2025-07-28",
                  contributionCount: 83,
                  color: "#9be9a8",
                },
                {
                  date: "2025-07-29",
                  contributionCount: 124,
                  color: "#9be9a8",
                },
                {
                  date: "2025-07-30",
                  contributionCount: 61,
                  color: "#9be9a8",
                },
                {
                  date: "2025-07-31",
                  contributionCount: 73,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-01",
                  contributionCount: 76,
                  color: "#40c463",
                },
                {
                  date: "2025-08-02",
                  contributionCount: 67,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-08-03",
                  contributionCount: 235,
                  color: "#ebedf0",
                },
                {
                  date: "2025-08-04",
                  contributionCount: 224,
                  color: "#ebedf0",
                },
                {
                  date: "2025-08-05",
                  contributionCount: 151,
                  color: "#216e39",
                },
                {
                  date: "2025-08-06",
                  contributionCount: 188,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-07",
                  contributionCount: 178,
                  color: "#40c463",
                },
                {
                  date: "2025-08-08",
                  contributionCount: 167,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-09",
                  contributionCount: 177,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-08-10",
                  contributionCount: 151,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-11",
                  contributionCount: 170,
                  color: "#40c463",
                },
                {
                  date: "2025-08-12",
                  contributionCount: 112,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-13",
                  contributionCount: 97,
                  color: "#40c463",
                },
                {
                  date: "2025-08-14",
                  contributionCount: 132,
                  color: "#ebedf0",
                },
                {
                  date: "2025-08-15",
                  contributionCount: 105,
                  color: "#30a14e",
                },
                {
                  date: "2025-08-16",
                  contributionCount: 43,
                  color: "#216e39",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-08-17",
                  contributionCount: 56,
                  color: "#216e39",
                },
                {
                  date: "2025-08-18",
                  contributionCount: 70,
                  color: "#216e39",
                },
                {
                  date: "2025-08-19",
                  contributionCount: 71,
                  color: "#40c463",
                },
                {
                  date: "2025-08-20",
                  contributionCount: 89,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-21",
                  contributionCount: 72,
                  color: "#ebedf0",
                },
                {
                  date: "2025-08-22",
                  contributionCount: 90,
                  color: "#ebedf0",
                },
                {
                  date: "2025-08-23",
                  contributionCount: 73,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-08-24",
                  contributionCount: 68,
                  color: "#ebedf0",
                },
                {
                  date: "2025-08-25",
                  contributionCount: 78,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-26",
                  contributionCount: 100,
                  color: "#30a14e",
                },
                {
                  date: "2025-08-27",
                  contributionCount: 91,
                  color: "#ebedf0",
                },
                {
                  date: "2025-08-28",
                  contributionCount: 71,
                  color: "#9be9a8",
                },
                {
                  date: "2025-08-29",
                  contributionCount: 115,
                  color: "#40c463",
                },
                {
                  date: "2025-08-30",
                  contributionCount: 138,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-08-31",
                  contributionCount: 71,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-01",
                  contributionCount: 70,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-02",
                  contributionCount: 25,
                  color: "#40c463",
                },
                {
                  date: "2025-09-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-09-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-09-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-09-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-09-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-09-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-10-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-10-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-10-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-10-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-10-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-11-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-11-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-11-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-11-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-11-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-11-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-12-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-12-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-12-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2025-12-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2025-12-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
          ],
        },
      },
    },
  },
};

const twentyFour = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 205,
          weeks: [
            {
              contributionDays: [
                {
                  date: "2024-01-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-01-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-01-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-01-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-01-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-01-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-02-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-02-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-02-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-02-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-02-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-03-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-03-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-03-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-03-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-03-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-03-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-04-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-04-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-14",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-15",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-18",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-04-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-04-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-22",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-24",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-04-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-04-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-29",
                  contributionCount: 4,
                  color: "#ebedf0",
                },
                {
                  date: "2024-04-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-05-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-05",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-05-11",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-16",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-05-18",
                  contributionCount: 10,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-19",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-20",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-05-21",
                  contributionCount: 2,
                  color: "#9be9a8",
                },
                {
                  date: "2024-05-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-24",
                  contributionCount: 5,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-05-25",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-26",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-27",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-05-31",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-06-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-03",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-04",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-05",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-06",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-07",
                  contributionCount: 4,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-06-08",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-09",
                  contributionCount: 4,
                  color: "#9be9a8",
                },
                {
                  date: "2024-06-10",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-11",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-13",
                  contributionCount: 9,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-14",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-06-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-06-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-28",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-06-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-06-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-02",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-03",
                  contributionCount: 7,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-04",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-05",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-07-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-09",
                  contributionCount: 0,
                  color: "#40c463",
                },
                {
                  date: "2024-07-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-11",
                  contributionCount: 0,
                  color: "#30a14e",
                },
                {
                  date: "2024-07-12",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-07-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-16",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-07-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-07-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-23",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-07-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-25",
                  contributionCount: 0,
                  color: "#40c463",
                },
                {
                  date: "2024-07-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-07-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-07-28",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-07-29",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-07-30",
                  contributionCount: 1,
                  color: "#9be9a8",
                },
                {
                  date: "2024-07-31",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-01",
                  contributionCount: 1,
                  color: "#40c463",
                },
                {
                  date: "2024-08-02",
                  contributionCount: 2,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-08-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-08-04",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-08-05",
                  contributionCount: 1,
                  color: "#216e39",
                },
                {
                  date: "2024-08-06",
                  contributionCount: 2,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-07",
                  contributionCount: 0,
                  color: "#40c463",
                },
                {
                  date: "2024-08-08",
                  contributionCount: 5,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-09",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-08-10",
                  contributionCount: 2,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-11",
                  contributionCount: 2,
                  color: "#40c463",
                },
                {
                  date: "2024-08-12",
                  contributionCount: 1,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-13",
                  contributionCount: 1,
                  color: "#40c463",
                },
                {
                  date: "2024-08-14",
                  contributionCount: 4,
                  color: "#ebedf0",
                },
                {
                  date: "2024-08-15",
                  contributionCount: 3,
                  color: "#30a14e",
                },
                {
                  date: "2024-08-16",
                  contributionCount: 0,
                  color: "#216e39",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-08-17",
                  contributionCount: 0,
                  color: "#216e39",
                },
                {
                  date: "2024-08-18",
                  contributionCount: 2,
                  color: "#216e39",
                },
                {
                  date: "2024-08-19",
                  contributionCount: 3,
                  color: "#40c463",
                },
                {
                  date: "2024-08-20",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-21",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-08-22",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2024-08-23",
                  contributionCount: 5,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-08-24",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
                {
                  date: "2024-08-25",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-26",
                  contributionCount: 2,
                  color: "#30a14e",
                },
                {
                  date: "2024-08-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-08-28",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
                {
                  date: "2024-08-29",
                  contributionCount: 0,
                  color: "#40c463",
                },
                {
                  date: "2024-08-30",
                  contributionCount: 0,
                  color: "#9be9a8",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-08-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-02",
                  contributionCount: 7,
                  color: "#40c463",
                },
                {
                  date: "2024-09-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-05",
                  contributionCount: 12,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-06",
                  contributionCount: 35,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-09-07",
                  contributionCount: 11,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-09-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-09-21",
                  contributionCount: 3,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-09-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-09-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-10-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-07",
                  contributionCount: 6,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-10-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-18",
                  contributionCount: 2,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-10-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-10-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-10-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-11-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-11-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-11-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-11-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-11-29",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-11-30",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-01",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-02",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-03",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-04",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-05",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-06",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-12-07",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-08",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-09",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-10",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-11",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-12",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-13",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-12-14",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-15",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-16",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-17",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-18",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-19",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-20",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-12-21",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-22",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-23",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-24",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-25",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-26",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-27",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2024-12-28",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-29",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-30",
                  contributionCount: 1,
                  color: "#ebedf0",
                },
                {
                  date: "2024-12-31",
                  contributionCount: 0,
                  color: "#ebedf0",
                },
              ],
            },
          ],
        },
      },
    },
  },
};
