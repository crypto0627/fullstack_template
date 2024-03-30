import { type createEventDto } from "@/lib/types/db";

export const createEvents = async (formData: createEventDto) => {
  try {
    const response = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from API:", errorData.error);
      // Handle error: Display it in UI, etc.
    } else {
      const eventData = await response.json();
      console.log("Event data:", eventData);
      // Process eventData as needed
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getEvents = async () => {
  try {
    const response = await fetch("/api/events");
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from API:", errorData.error);
      // Handle error: Display it in UI, etc.
    } else {
      const eventData = await response.json();
      console.log("Event data:", eventData);
      return eventData;
      // Process eventData as needed
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
