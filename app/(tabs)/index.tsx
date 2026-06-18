import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native"; 
import StudentItem from "@/components/student-item"; 
import { Student, STUDENTS } from "@/data/student"; 
import SearchBar from "@/components/search-bar"; 
import StudentDetail from "@/components/student-detail"; 
import { useState } from "react"; 

export default function HomeScreen() { 

    const [query, setQuery] = useState<string>(""); 
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); 
    const [departmentFilter, setDepartmentFilter] = useState<string>("All");
    const handleSelect = (student: Student) => { 
      setSelectedStudent((prev) => (prev?.id === student.id ? null : student)); 
    }; 
    const filtered = STUDENTS.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.department.toLowerCase().includes(query.toLowerCase());

        const matchesDepartment =
          departmentFilter === "All" ||
          s.department === departmentFilter;

        return matchesQuery && matchesDepartment;
    }); 

    return ( 

        <ScrollView style={styles.container}> 
            <View style={styles.titleBar}> 
              <Text style={styles.title}>Student Directory</Text> 
            </View> 
            <View style={styles.filterTabs}>
  {["All", "Computer Science", "Software Engineering"].map((dept) => (
    <TouchableOpacity
      key={dept}
      style={[
        styles.tab,
        departmentFilter === dept && styles.activeTab,
      ]}
      onPress={() => setDepartmentFilter(dept)}
    >
      <Text
        style={[
          styles.tabText,
          departmentFilter === dept && styles.activeTabText,
        ]}
      >
        {dept}
      </Text>
    </TouchableOpacity>
  ))}
</View>
            <SearchBar value={query} onChangeText={setQuery} /> 

            <FlatList 
              data={filtered} 
              keyExtractor={(item) => item.id} 
                renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedStudent?.id === item.id} />} 
                ListEmptyComponent={ 
                  <View style={styles.empty}> 
                    <Text style={styles.emptyText}>No students match "{query}"</Text> 
                  </View> 
                } 
            /> 
            {selectedStudent && <StudentDetail student={selectedStudent} />} 
        </ScrollView> 
    ); 

} 

const styles = StyleSheet.create({ 

    container: { 
      flex: 1, 
      backgroundColor: "#F0F4F8", 
    }, 

    titleContainer: { 
      flexDirection: "row", 
      alignItems: "center", 
      gap: 8, 
    }, 

    stepContainer: { 
      gap: 8, 
      marginBottom: 8, 
    }, 

    reactLogo: { 
      height: 178, 
      width: 290, 
      bottom: 0, 
      left: 0, 
      position: "absolute", 
    }, 
    titleBar: { 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      paddingHorizontal: 16, 
      paddingVertical: 14, 
      backgroundColor: "#0D1F4E", 
    }, 

    title: { 
      fontSize: 20, 
      fontWeight: "bold", 
      color: "#FFFFFF", 
    }, 

    count: { 
      fontSize: 12, 
      color: "#CCFBF1", 
    }, 

    empty: { 
        padding: 40, 
        alignItems: "center", 
    }, 

    emptyText: { 
        fontSize: 14, 
        color: "#94A3B8", 
    }, 
    filterTabs: {
  flexDirection: "row",
  paddingHorizontal: 10,
  paddingVertical: 10,
  gap: 8,
},

tab: {
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  backgroundColor: "#E2E8F0",
},

activeTab: {
  backgroundColor: "#2563EB",
},

tabText: {
  fontSize: 12,
  color: "#334155",
},

activeTabText: {
  color: "#FFFFFF",
  fontWeight: "bold",
},

}); 