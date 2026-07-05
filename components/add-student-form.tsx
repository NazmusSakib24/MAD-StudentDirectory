import React from "react"; 
import { useEffect, useState } from "react"; 
import { 
  ActivityIndicator, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
} from "react-native"; 
import FormField from "./form-field"; 
import { Student } from "../data/student"; 

interface AddStudentFormProps { 
  onSubmitSuccess: (student: Student) => void; 
} 

interface FormData { 
  name: string; 
  studentId: string; 
  department: string; 
  bio: string; 
  skillsText: string; 
} 

interface FormErrors { 
  name?: string; 
  studentId?: string; 
  department?: string; 
  bio?: string; 
} 

function validateForm(data: FormData): FormErrors { 
  const newErrors: FormErrors = {}; 
  if (data.name.trim().length === 0) { 
    newErrors.name = "Name is required."; 
  } else if (data.name.trim().length < 3) { 
    newErrors.name = "Name must be at least 3 characters."; 
  }  
  const idPattern = /^\d{2}-\d{5}-\d$/; 
  if (data.studentId.trim().length === 0) { 
    newErrors.studentId = "Student ID is required."; 
  } else if (!idPattern.test(data.studentId.trim())) { 
    newErrors.studentId = "Format must be NN-NNNNN-N (e.g. 22-12345-1)."; 
  } 
  if (data.department.trim().length === 0) { 
    newErrors.department = "Department is required."; 
  } 
  if (data.bio.trim().length === 0) { 
    newErrors.bio = "Bio is required."; 
  } else if (data.bio.trim().length < 10) { 
    newErrors.bio = "Bio must be at least 10 characters."; 
  } 

  return newErrors; 
}

export default function AddStudentForm({ onSubmitSuccess }: AddStudentFormProps) { 

  const [formData, setFormData] = useState<FormData>({ 
    name: "", 
    studentId: "", 
    department: "", 
    bio: "", 
    skillsText: "", 
  }); 

  const [errors, setErrors] = useState<FormErrors>({}); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  const updateField = (field: keyof FormData, value: string) => { 
    setFormData((prev) => ({ ...prev, [field]: value })); 
  }; 
useEffect(() => {
  const newErrors = validateForm(formData);
  setErrors(newErrors);
}, [formData]);

const isFormValid =
  Object.keys(errors).length === 0 &&
  formData.name.length > 0 &&
  formData.studentId.length > 0;
  
return ( 

    <ScrollView style={styles.container}> 

      <Text style={styles.heading}>Join the Directory</Text> 
      <Text style={styles.subheading}> 
        Fill in your details below to add yourself to StudentDirectory. 
      </Text> 

      <FormField 
        label="Full Name" 
        value={formData.name} 
        onChangeText={(text) => updateField("name", text)} 
        placeholder="e.g. Ashraful Haque" 
        error={errors.name} 
      /> 

      <FormField 
        label="Student ID" 
        value={formData.studentId} 
        onChangeText={(text) => updateField("studentId", text)} 
        placeholder="e.g. 22-12345-1" 
        autoCapitalize="none" 
        error={errors.studentId} 
      /> 

      <FormField 
        label="Department" 
        value={formData.department} 
        onChangeText={(text) => updateField("department", text)} 
        placeholder="e.g. Computer Science" 
        error={errors.department} 
      /> 

      <FormField 
        label="Bio" 
        value={formData.bio} 
        onChangeText={(text) => updateField("bio", text)} 
        placeholder="A short sentence about yourself..." 
        multiline 
        error={errors.bio} 
      /> 

      <FormField 
        label="Skills (comma-separated)" 
        value={formData.skillsText} 
        onChangeText={(text) => updateField("skillsText", text)} 
        placeholder="e.g. React Native, TypeScript, Figma" 
        autoCapitalize="none"
      /> 

      {/* Submit button goes here — Section 6 */} 
    </ScrollView> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 20 }, 
  heading: { fontSize: 20, fontWeight: "800", color: "#0D1F4E", marginBottom: 4 }, 
  subheading: { fontSize: 13, color: "#64748B", marginBottom: 24, lineHeight: 19 }, 
});  



  