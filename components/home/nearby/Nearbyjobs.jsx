import styles from "./nearbyjobs.style";
import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import Nearbyjobcard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => {
            job?.job_country == "AU" && (
              <Nearbyjobcard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;

//                  **********Testing Dataset**********
//const dataaa = [
//   {
//     employer_name: "Charles Schwab",
//     employer_logo:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Charles_Schwab_Corporation_logo.svg/1200px-Charles_Schwab_Corporation_logo.svg.png",
//     job_id: "G6qYxpAYyVsAAAAAAAAAAA==",
//     job_title: "Software Web Developer",
//     job_employment_type: "FULLTIME",
//   },
//   {
//     employer_name: "Dice",
//     employer_logo:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlgydP7sElaJC9qPrtNHwBhyTMHYgii1RPWsy&s=0",
//     job_id: "8yv3oA_2-UYAAAAAAAAAAA==",
//     job_title: "Web Developer - 6-month Contract - Houston Hybrid",
//     job_employment_type: "CONTRACTOR",
//   },
// ];
