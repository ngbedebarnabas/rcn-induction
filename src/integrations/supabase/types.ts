export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      registrations: {
        Row: {
          accepted_christ_date: string
          address: string
          anniversary_date: string | null
          believe_in_tongues: string | null
          children_count: string | null
          conversion_experience: string | null
          created_at: string | null
          current_affiliation: string
          current_capacity: string
          date_of_birth: string
          date_of_holy_ghost_baptism: string | null
          date_of_new_birth: string | null
          date_of_water_baptism: string | null
          denominational_background: string
          desire_tongues: string | null
          devotional_pattern: string | null
          divorce_count: string | null
          elder_email: string
          elder_name: string
          elder_phone: string
          email: string
          employment_address: string | null
          employment_description: string | null
          family_devotional: string | null
          first_name: string
          formal_christian_training: string
          full_name: string | null
          future_vision: string | null
          gods_call_experience: string | null
          id: string
          is_divorced: string
          is_spouse_believer: string
          last_divorce_date: string | null
          last_name: string
          marital_status: string
          middle_name: string | null
          minister_email: string
          minister_name: string
          minister_phone: string
          ministry_concept: string | null
          ministry_description: string
          ministry_duration: string
          ministry_gift: string | null
          ministry_income: string
          ministry_strengths: string | null
          ministry_success_definition: string | null
          ministry_weaknesses: string | null
          non_ordination_effect: string | null
          ordination_by: string | null
          ordination_date: string | null
          ordination_type: string | null
          other_employment: string
          passport_url: string | null
          pastor_email: string
          pastor_name: string
          pastor_phone: string
          payment_status: string | null
          phone_numbers: string
          place_of_birth: string
          pray_in_tongues: string
          previously_ordained: string
          recommended_by: string
          recommender_full_name: string | null
          recommender_phone: string | null
          relationship_evaluation: string | null
          response_document_url: string | null
          social_media: string | null
          spiritual_gifts: string | null
          spiritual_gifts_manifest: string
          spiritual_history: string[] | null
          spouse_date_of_birth: string | null
          spouse_ministry_feelings: string | null
          spouse_name: string
          training_duration: string | null
          training_institution: string | null
          updated_at: string | null
          water_baptized: string
        }
        Insert: {
          accepted_christ_date: string
          address: string
          anniversary_date?: string | null
          believe_in_tongues?: string | null
          children_count?: string | null
          conversion_experience?: string | null
          created_at?: string | null
          current_affiliation: string
          current_capacity: string
          date_of_birth: string
          date_of_holy_ghost_baptism?: string | null
          date_of_new_birth?: string | null
          date_of_water_baptism?: string | null
          denominational_background: string
          desire_tongues?: string | null
          devotional_pattern?: string | null
          divorce_count?: string | null
          elder_email: string
          elder_name: string
          elder_phone: string
          email: string
          employment_address?: string | null
          employment_description?: string | null
          family_devotional?: string | null
          first_name: string
          formal_christian_training: string
          full_name?: string | null
          future_vision?: string | null
          gods_call_experience?: string | null
          id?: string
          is_divorced: string
          is_spouse_believer: string
          last_divorce_date?: string | null
          last_name: string
          marital_status: string
          middle_name?: string | null
          minister_email: string
          minister_name: string
          minister_phone: string
          ministry_concept?: string | null
          ministry_description: string
          ministry_duration: string
          ministry_gift?: string | null
          ministry_income: string
          ministry_strengths?: string | null
          ministry_success_definition?: string | null
          ministry_weaknesses?: string | null
          non_ordination_effect?: string | null
          ordination_by?: string | null
          ordination_date?: string | null
          ordination_type?: string | null
          other_employment: string
          passport_url?: string | null
          pastor_email: string
          pastor_name: string
          pastor_phone: string
          payment_status?: string | null
          phone_numbers: string
          place_of_birth: string
          pray_in_tongues: string
          previously_ordained: string
          recommended_by: string
          recommender_full_name?: string | null
          recommender_phone?: string | null
          relationship_evaluation?: string | null
          response_document_url?: string | null
          social_media?: string | null
          spiritual_gifts?: string | null
          spiritual_gifts_manifest: string
          spiritual_history?: string[] | null
          spouse_date_of_birth?: string | null
          spouse_ministry_feelings?: string | null
          spouse_name: string
          training_duration?: string | null
          training_institution?: string | null
          updated_at?: string | null
          water_baptized: string
        }
        Update: {
          accepted_christ_date?: string
          address?: string
          anniversary_date?: string | null
          believe_in_tongues?: string | null
          children_count?: string | null
          conversion_experience?: string | null
          created_at?: string | null
          current_affiliation?: string
          current_capacity?: string
          date_of_birth?: string
          date_of_holy_ghost_baptism?: string | null
          date_of_new_birth?: string | null
          date_of_water_baptism?: string | null
          denominational_background?: string
          desire_tongues?: string | null
          devotional_pattern?: string | null
          divorce_count?: string | null
          elder_email?: string
          elder_name?: string
          elder_phone?: string
          email?: string
          employment_address?: string | null
          employment_description?: string | null
          family_devotional?: string | null
          first_name?: string
          formal_christian_training?: string
          full_name?: string | null
          future_vision?: string | null
          gods_call_experience?: string | null
          id?: string
          is_divorced?: string
          is_spouse_believer?: string
          last_divorce_date?: string | null
          last_name?: string
          marital_status?: string
          middle_name?: string | null
          minister_email?: string
          minister_name?: string
          minister_phone?: string
          ministry_concept?: string | null
          ministry_description?: string
          ministry_duration?: string
          ministry_gift?: string | null
          ministry_income?: string
          ministry_strengths?: string | null
          ministry_success_definition?: string | null
          ministry_weaknesses?: string | null
          non_ordination_effect?: string | null
          ordination_by?: string | null
          ordination_date?: string | null
          ordination_type?: string | null
          other_employment?: string
          passport_url?: string | null
          pastor_email?: string
          pastor_name?: string
          pastor_phone?: string
          payment_status?: string | null
          phone_numbers?: string
          place_of_birth?: string
          pray_in_tongues?: string
          previously_ordained?: string
          recommended_by?: string
          recommender_full_name?: string | null
          recommender_phone?: string | null
          relationship_evaluation?: string | null
          response_document_url?: string | null
          social_media?: string | null
          spiritual_gifts?: string | null
          spiritual_gifts_manifest?: string
          spiritual_history?: string[] | null
          spouse_date_of_birth?: string | null
          spouse_ministry_feelings?: string | null
          spouse_name?: string
          training_duration?: string | null
          training_institution?: string | null
          updated_at?: string | null
          water_baptized?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
