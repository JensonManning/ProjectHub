import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { UserService } from '@/core/services/user/user.service';
import { ProjectUser, ProjectUserSimple } from '@/core/interfaces/User/user.interface';
import { RoleService } from '@/core/services/user/role.service';

interface Column {
	field: string;
	header: string;
	customExportHeader?: string;
}

interface ExportColumn {
	title: string;
	dataKey: string;
}

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule, TableModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, RatingModule, InputTextModule, TextareaModule, SelectModule, RadioButtonModule, InputNumberModule, DialogModule, TagModule, InputIconModule, IconFieldModule, ConfirmDialogModule, SkeletonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ManageUsersComponent {
  projectUserService = inject(UserService);
  roleService = inject(RoleService);
	filterColFields: string[] = ['id', 'name', 'email', 'phone', 'role'];
	projectUserDialog: boolean = false;
	projectUser!: ProjectUser;
  projectUsers!: ProjectUser[];

	projectUserSubmitted: boolean = false;

	@ViewChild('dt') dt!: Table;
	@ViewChild('ph') ph!: Table;

	exportColumns!: ExportColumn[];
	cols!: Column[];

	constructor(
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {
		
	}

	exportCSV() {
		this.dt.exportCSV();
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	openNew() {
		this.projectUser = {id: '', name: '', email: '', phone: '', roleId: 0, role: {
      id: 0, name: ''
    }};
		this.projectUserSubmitted = false;
		this.projectUserDialog = true;
	}

	editUser(projectUser: ProjectUser) {
		this.projectUser = { 
			id: projectUser.id,
			name: projectUser.name,
			email: projectUser.email,
			phone: projectUser.phone,
			roleId: projectUser.role?.id || projectUser.roleId || 0,
			role: projectUser.role || { id: 0, name: '' }
		};
		console.log('Editing user with ID:', projectUser.id, 'Role ID:', this.projectUser.roleId);
		this.projectUserService.selectedUser.set(projectUser);
		this.projectUserDialog = true;
	}

    deleteSelectedUsers(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected Users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.projectUserService.selectedUsers.set(this.projectUserService.selectedUsers().filter((val) => !this.projectUserService.selectedUsers().includes(val)));
                this.projectUserService.deleteUser(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Users Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.projectUserDialog = false;
		this.projectUserSubmitted = false;
    }

	findUserIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.projectUserService.allUsers().length; i++) {
            if (this.projectUserService.allUsers()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

	createUserId(projectUser: ProjectUser) {
		this.projectUserService.createUser(projectUser);
	}

	saveUser() {
		this.projectUserSubmitted = true;
		let _Users = this.projectUserService.allUsers();
		if (this.projectUser.name?.trim()) {
			if (this.projectUser.id) {
                console.log("Updating user with ID:", this.projectUser.id);
                
                // Ensure we send the right data format for update
                const userToUpdate = {
                    id: this.projectUser.id,
                    name: this.projectUser.name,
                    email: this.projectUser.email,
                    phone: this.projectUser.phone,
                    roleId: this.projectUser.roleId
                };
                
				_Users[this.findUserIndexById(this.projectUser.id)] = this.projectUser;
				this.projectUserService.selectedUsers.set([..._Users]);
                this.projectUserService.editUser(this.projectUser.id, userToUpdate);
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'User Updated',
					life: 3000
				});
            }
            else {
                console.log("Creating new user");
                
                // Ensure we send the right data format for create
                const userToCreate = {
                    id: this.projectUser.id,
                    name: this.projectUser.name,
                    email: this.projectUser.email,
                    phone: this.projectUser.phone,
                    roleId: this.projectUser.roleId
                };
                
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'User Created',
					life: 3000
				});
				this.projectUserService.createUser(userToCreate);
			}

			this.projectUserDialog = false;
			this.projectUser = {
				id: '',
				name: '',
                email: '',
                phone: '',
                roleId: 0,
                role: {
                  id: 0,
                  name: ''
                }
			};
        }
	}
}
