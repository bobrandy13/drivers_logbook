const update_logbook_hours = async () => {
  const update_hours = await fetch("http://localhost:3000/logbook", {
    method: "PATCH",
    body: JSON.stringify({
      hours_driven: "5",
    }),
  });

  console.log(update_hours);
};

update_logbook_hours();
