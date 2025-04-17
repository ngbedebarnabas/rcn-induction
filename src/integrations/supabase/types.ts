export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      registrations: {
        Row: {
          accepted_christ_date: string
          address: string
          anniversary_date: string
          believe_in_tongues: string | null
          children_count: string
          created_at: string | null
          current_affiliation: string
          current_capacity: string
          date_of_birth: string
          date_of_holy_ghost_baptism: string | null
          date_of_new_birth: string | null
          date_of_water_baptism: string | null
          denominational_background: string
          desire_tongues: string | null
          divorce_count: string | null
          document_url: string | null
          elder_email: string
          elder_name: string
          elder_phone: string
          email: string
          employment_address: string | null
          employment_description: string | null
          formal_christian_training: string
          full_name: string
          id: string
          is_divorced: string
          is_spouse_believer: string
          last_divorce_date: string | null
          marital_status: string
          minister_email: string
          minister_name: string
          minister_phone: string
          ministry_description: string
          ministry_duration: string
          ministry_gift: string | null
          ministry_income: string
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
          social_media: string | null
          spiritual_gifts: string | null
          spiritual_gifts_manifest: string
          spiritual_history: string[] | null
          spouse_date_of_birth: string
          spouse_name: string
          training_duration: string | null
          training_institution: string | null
          updated_at: string | null
          water_baptized: string
        }
        Insert: {
          accepted_christ_date: string
          address: string
          anniversary_date: string
          believe_in_tongues?: string | null
          children_count: string
          created_at?: string | null
          current_affiliation: string
          current_capacity: string
          date_of_birth: string
          date_of_holy_ghost_baptism?: string | null
          date_of_new_birth?: string | null
          date_of_water_baptism?: string | null
          denominational_background: string
          desire_tongues?: string | null
          divorce_count?: string | null
          document_url?: string | null
          elder_email: string
          elder_name: string
          elder_phone: string
          email: string
          employment_address?: string | null
          employment_description?: string | null
          formal_christian_training: string
          full_name: string
          id?: string
          is_divorced: string
          is_spouse_believer: string
          last_divorce_date?: string | null
          marital_status: string
          minister_email: string
          minister_name: string
          minister_phone: string
          ministry_description: string
          ministry_duration: string
          ministry_gift?: string | null
          ministry_income: string
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
          social_media?: string | null
          spiritual_gifts?: string | null
          spiritual_gifts_manifest: string
          spiritual_history?: string[] | null
          spouse_date_of_birth: string
          spouse_name: string
          training_duration?: string | null
          training_institution?: string | null
          updated_at?: string | null
          water_baptized: string
        }
        Update: {
          accepted_christ_date?: string
          address?: string
          anniversary_date?: string
          believe_in_tongues?: string | null
          children_count?: string
          created_at?: string | null
          current_affiliation?: string
          current_capacity?: string
          date_of_birth?: string
          date_of_holy_ghost_baptism?: string | null
          date_of_new_birth?: string | null
          date_of_water_baptism?: string | null
          denominational_background?: string
          desire_tongues?: string | null
          divorce_count?: string | null
          document_url?: string | null
          elder_email?: string
          elder_name?: string
          elder_phone?: string
          email?: string
          employment_address?: string | null
          employment_description?: string | null
          formal_christian_training?: string
          full_name?: string
          id?: string
          is_divorced?: string
          is_spouse_believer?: string
          last_divorce_date?: string | null
          marital_status?: string
          minister_email?: string
          minister_name?: string
          minister_phone?: string
          ministry_description?: string
          ministry_duration?: string
          ministry_gift?: string | null
          ministry_income?: string
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
          social_media?: string | null
          spiritual_gifts?: string | null
          spiritual_gifts_manifest?: string
          spiritual_history?: string[] | null
          spouse_date_of_birth?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
