export const defaultData = {
    boards: [
      {
        id: 1,
        name: "Platform Launch",
        columns: [
          {
            name: "Todo",
            color: "cyan",
            tasks: [
              {
                id: 1,
                title: "Build UI for onboarding flow",
                description: "",
                subtasks: [
                  { title: "Sign up page", completed: true },
                  { title: "Sign in page", completed: false },
                  { title: "Welcome page", completed: false },
                ],
              },
              {
                id: 2,
                title: "Build UI for search",
                description: "",
                subtasks: [{ title: "Search page", completed: false }],
              },
            ],
          },
          {
            name: "Doing",
            color: "purple",
            tasks: [
              {
                id: 3,
                title: "Design settings and search pages",
                description: "",
                subtasks: [
                  { title: "Settings - Account page", completed: true },
                  { title: "Settings - Billing page", completed: true },
                  { title: "Search page", completed: false },
                ],
              },
            ],
          },
          {
            name: "Done",
            color: "green",
            tasks: [
              {
                id: 4,
                title: "Conduct 5 wireframe tests",
                description: "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
                subtasks: [{ title: "Complete 5 wireframe prototype tests", completed: true }],
              },
            ],
          },
        ],
      },
    ],
  }
  
  