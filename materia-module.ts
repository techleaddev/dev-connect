import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  exports: [MatTableModule, MatButtonModule, MatDialogModule],
})
export class MateriaModule {}
