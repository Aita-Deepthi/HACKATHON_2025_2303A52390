import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime

class HospitalManagementSystem:
    def __init__(self, root):
        self.root = root
        self.root.title("Hospital Management System")
        self.root.geometry("1200x700")
        
        # Sample Data
        self.queue_data = [
            {"id": 1, "name": "John Doe", "department": "Cardiology", "wait_time": "15 mins"},
            {"id": 2, "name": "Jane Smith", "department": "Orthopedics", "wait_time": "25 mins"},
            {"id": 3, "name": "Mike Johnson", "department": "Pediatrics", "wait_time": "10 mins"},
        ]
        
        self.bed_data = [
            {"ward": "General", "total": 50, "available": 15},
            {"ward": "ICU", "total": 20, "available": 3},
            {"ward": "Emergency", "total": 30, "available": 8},
            {"ward": "Pediatric", "total": 25, "available": 12},
        ]
        
        self.inventory_data = [
            {"item": "Paracetamol", "stock": 1500, "unit": "tablets"},
            {"item": "Bandages", "stock": 500, "unit": "rolls"},
            {"item": "Syringes", "stock": 2000, "unit": "pieces"},
            {"item": "Surgical Masks", "stock": 5000, "unit": "pieces"},
        ]
        
        self.departments = ["Cardiology", "Orthopedics", "Pediatrics", "General Medicine", "ENT"]
        self.next_patient_id = len(self.queue_data) + 1
        
        self.setup_ui()
        
    def setup_ui(self):
        # Create Notebook for tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(expand=True, fill='both', padx=10, pady=5)
        
        # Create Tabs
        self.queue_tab = ttk.Frame(self.notebook)
        self.beds_tab = ttk.Frame(self.notebook)
        self.inventory_tab = ttk.Frame(self.notebook)
        
        self.notebook.add(self.queue_tab, text='OPD Queue')
        self.notebook.add(self.beds_tab, text='Bed Management')
        self.notebook.add(self.inventory_tab, text='Inventory')
        
        self.setup_queue_tab()
        self.setup_beds_tab()
        self.setup_inventory_tab()
        
    def setup_queue_tab(self):
        # Queue Header
        header_frame = ttk.Frame(self.queue_tab)
        header_frame.pack(fill='x', padx=5, pady=5)
        
        ttk.Label(header_frame, text="Current Queue Status", 
                 font=('Helvetica', 16, 'bold')).pack(side='left')
        
        # Add Patient Form
        form_frame = ttk.LabelFrame(self.queue_tab, text="Add New Patient")
        form_frame.pack(fill='x', padx=5, pady=5)
        
        # Patient Name
        name_frame = ttk.Frame(form_frame)
        name_frame.pack(fill='x', padx=5, pady=2)
        ttk.Label(name_frame, text="Patient Name:").pack(side='left')
        self.patient_name = tk.StringVar()
        ttk.Entry(name_frame, textvariable=self.patient_name).pack(side='left', padx=5)
        
        # Department
        dept_frame = ttk.Frame(form_frame)
        dept_frame.pack(fill='x', padx=5, pady=2)
        ttk.Label(dept_frame, text="Department:").pack(side='left')
        self.patient_dept = tk.StringVar()
        dept_combo = ttk.Combobox(dept_frame, textvariable=self.patient_dept, values=self.departments)
        dept_combo.pack(side='left', padx=5)
        
        # Add Button
        ttk.Button(form_frame, text="Add Patient", command=self.add_patient).pack(pady=5)
        
        # Queue Table
        columns = ('ID', 'Patient Name', 'Department', 'Wait Time')
        self.queue_tree = ttk.Treeview(self.queue_tab, columns=columns, show='headings')
        
        # Set column headings
        for col in columns:
            self.queue_tree.heading(col, text=col)
            self.queue_tree.column(col, width=150)
        
        # Add Scrollbar
        scrollbar = ttk.Scrollbar(self.queue_tab, orient="vertical", command=self.queue_tree.yview)
        self.queue_tree.configure(yscrollcommand=scrollbar.set)
        
        self.queue_tree.pack(fill='both', expand=True, padx=5, pady=5)
        scrollbar.pack(side="right", fill="y")
        
        # Add Remove Button
        ttk.Button(self.queue_tab, text="Remove Selected Patient", 
                  command=self.remove_patient).pack(pady=5)
        
        # Initialize queue display
        self.refresh_queue()
    
    def add_patient(self):
        name = self.patient_name.get().strip()
        dept = self.patient_dept.get().strip()
        
        if not name or not dept:
            messagebox.showerror("Error", "Please fill in all fields")
            return
        
        new_patient = {
            "id": self.next_patient_id,
            "name": name,
            "department": dept,
            "wait_time": "0 mins"
        }
        
        self.queue_data.append(new_patient)
        self.next_patient_id += 1
        self.refresh_queue()
        
        # Clear form
        self.patient_name.set("")
        self.patient_dept.set("")
        
        messagebox.showinfo("Success", "Patient added successfully")
    
    def remove_patient(self):
        selected_item = self.queue_tree.selection()
        if not selected_item:
            messagebox.showerror("Error", "Please select a patient to remove")
            return
        
        patient_id = self.queue_tree.item(selected_item)['values'][0]
        self.queue_data = [p for p in self.queue_data if p['id'] != patient_id]
        self.refresh_queue()
        messagebox.showinfo("Success", "Patient removed successfully")
    
    def refresh_queue(self):
        # Clear existing items
        for item in self.queue_tree.get_children():
            self.queue_tree.delete(item)
        
        # Add updated data
        for item in self.queue_data:
            self.queue_tree.insert('', 'end', values=(item['id'],
                                                     item['name'], 
                                                     item['department'], 
                                                     item['wait_time']))
    
    def setup_beds_tab(self):
        # Beds Header
        header_frame = ttk.Frame(self.beds_tab)
        header_frame.pack(fill='x', padx=5, pady=5)
        
        ttk.Label(header_frame, text="Bed Availability", 
                 font=('Helvetica', 16, 'bold')).pack(side='left')
        
        # Create frame for bed status cards
        bed_frame = ttk.Frame(self.beds_tab)
        bed_frame.pack(fill='both', expand=True, padx=5, pady=5)
        
        # Create bed status cards
        for i, ward in enumerate(self.bed_data):
            card = ttk.LabelFrame(bed_frame, text=f"{ward['ward']} Ward")
            card.grid(row=i//2, column=i%2, padx=10, pady=5, sticky='nsew')
            
            ttk.Label(card, text=f"Available: {ward['available']}", 
                     font=('Helvetica', 12)).pack(pady=2)
            ttk.Label(card, text=f"Total: {ward['total']}", 
                     font=('Helvetica', 12)).pack(pady=2)
        
        # Configure grid
        bed_frame.grid_columnconfigure(0, weight=1)
        bed_frame.grid_columnconfigure(1, weight=1)
        
    def setup_inventory_tab(self):
        # Inventory Header
        header_frame = ttk.Frame(self.inventory_tab)
        header_frame.pack(fill='x', padx=5, pady=5)
        
        ttk.Label(header_frame, text="Inventory Management", 
                 font=('Helvetica', 16, 'bold')).pack(side='left')
        
        # Inventory Table
        columns = ('Item', 'Current Stock', 'Unit')
        self.inventory_tree = ttk.Treeview(self.inventory_tab, columns=columns, show='headings')
        
        # Set column headings
        for col in columns:
            self.inventory_tree.heading(col, text=col)
            self.inventory_tree.column(col, width=150)
        
        # Add data
        for item in self.inventory_data:
            self.inventory_tree.insert('', 'end', values=(item['item'], 
                                                         item['stock'], 
                                                         item['unit']))
        
        self.inventory_tree.pack(fill='both', expand=True, padx=5, pady=5)

if __name__ == "__main__":
    root = tk.Tk()
    app = HospitalManagementSystem(root)
    root.mainloop()