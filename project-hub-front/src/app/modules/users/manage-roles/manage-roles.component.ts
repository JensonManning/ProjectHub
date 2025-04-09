import { Component, inject, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
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
import { RoleService } from '@/core/services/user/role.service';
import { ProjectRoleSimple } from '@/core/interfaces/User/role.interface';

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
  selector: 'app-manage-roles',
  imports: [TableModule, CommonModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, RatingModule, InputTextModule, TextareaModule, SelectModule, RadioButtonModule, InputNumberModule, DialogModule, TagModule, InputIconModule, IconFieldModule, ConfirmDialogModule, SkeletonModule],
  templateUrl: './manage-roles.component.html',
  styleUrl: './manage-roles.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ManageRolesComponent {
  roleService = inject(RoleService);

  filterColFields: string[] = ['id', 'name'];
	roleDialog: boolean = false;
	role!: ProjectRoleSimple;

	roleSubmitted: boolean = false;

	@ViewChild('ph') ph!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.ph.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
		this.role = {id: 0, name: ''};
		this.roleSubmitted = false;
		this.roleDialog = true;
    }

	editRole(role: ProjectRoleSimple) {
		this.role = { ...role };
		this.roleService.selectedRole.set(role);
		this.roleDialog = true;
	}

    deleteSelectedRoles(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected categories?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roleService.selectedRoles.set(this.roleService.selectedRoles().filter((val) => !this.roleService.selectedRoles().includes(val)));
                this.roleService.deleteRole(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Roles Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.roleDialog = false;
		this.roleSubmitted = false;
    }

	findRoleIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.roleService.allRoles().length; i++) {
            if (this.roleService.allRoles()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

	createRoleId(role: ProjectRoleSimple) {
		this.roleService.createRole(role);
	}

	saveRole() {
		this.roleSubmitted = true;
		let _roles = this.roleService.allRoles();
		if (this.role.name?.trim()) {
			if (this.role.id) {
                console.log(this.role);
				_roles[this.findRoleIndexById(this.role.id)] = this.role;
				this.roleService.selectedRoles.set([..._roles]);
                this.roleService.editRole(this.role.id, this.role)
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Role Updated',
					life: 3000
				});
            }
            else {
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Role Created',
					life: 3000
				});
				this.roleService.createRole(this.role);
			}

			this.roleDialog = false;
			this.role = {
				id: 0,
				name: '',
			};
        }
	}
}
