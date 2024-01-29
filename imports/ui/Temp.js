import React, { useEffect, useState } from "react";
import { Meteor } from 'meteor/meteor';

const Temp = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await new Promise((resolve, reject) => {
          Meteor.call('users.getAll', (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });

        
        setUsers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(users);

  return (
    <div>

    </div>
  );
}

export default Temp;
