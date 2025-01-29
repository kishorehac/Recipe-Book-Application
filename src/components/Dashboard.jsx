import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import app from "../firebaseSetup/firebaseConfig";
import { ref, get, getDatabase } from "firebase/database";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { isLoaded, user } = useUser();
  const [query, setQuery] = useState("");

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      const db = getDatabase(app);
      const dataRef = ref(db, `data/users/${user.id}`);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      } else {
        console.warn("No data found.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user]); // `user` is now a dependency

  useEffect(() => {
    if (isLoaded && user) {
      fetchData();
    }
  }, [isLoaded, user, fetchData]); // Added `fetchData` to dependencies

  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 className="p-2 m-2 text-3xl bold text-gray-700 border-l-4 border-green-500">
        Dashboard
      </h2>
      <div>
        <input
          className="border w-[100%] shadow-sm rounded-sm pl-1"
          id="names"
          type="text"
          placeholder="Enter recipe name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="text-green-500">Search</div>
      </div>
      {filteredItems.length > 0 ? (
        filteredItems.reverse().map((item, index) => (
          <div key={index} className="rounded-lg shadow-lg p-3 border m-10">
            <div className="text-3xl font-bold text-stone-700">{item.name}</div>
          </div>
        ))
      ) : (
        <div>No recipes found. Please add a recipe.</div>
      )}
    </div>
  );
};

export default Dashboard;
