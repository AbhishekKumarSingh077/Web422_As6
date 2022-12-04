import { getToken } from "./authenticate";

const MyCyclicURL = process.env.NEXT_PUBLIC_API_URL

export async function addToFavourites(id) {
  const res = await fetch(
    `${MyCyclicURL}/favourites/` + id,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Authorization": `JWT ${getToken()}` 
      },
    }
  );
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const res = await fetch(
    `${MyCyclicURL}/favourites/` + id,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Authorization": `JWT ${getToken()}` 
      },
    }
  );
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function getFavourites() {
  const res = await fetch(`${MyCyclicURL}/favourites`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `JWT ${getToken()}` 
    },
  });
  
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function addToHistory(id) {
  const res = await fetch(`${MyCyclicURL}/history/` + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "Authorization": `JWT ${getToken()}` 
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function getHistory() {
  const res = await fetch(`${MyCyclicURL}/history`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `JWT ${getToken()}` 
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function removeFromHistory(id) {
  const res = await fetch(`${MyCyclicURL}/history/` + id, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "Authorization": `JWT ${getToken()}` 
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
