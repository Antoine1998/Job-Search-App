import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState, useCallback } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import About from "../../components/jobdetails/about/About";

function JobDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const tabs = ["About", "Qualifications", "Responsibilities"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <About
            info={data[0].job_description ?? "No data provided"}
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimensions="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimensions="60%" />
          ),
        }}
      ></Stack.Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              jobTitle={data[0].job_title}
              companyLogo={data[0].employer_logo}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />

            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter
        url={
          data[0]?.job_google_link ?? "https://careers.google.cm/jobs/results"
        }
      />
    </SafeAreaView>
  );
}

export default JobDetails;
