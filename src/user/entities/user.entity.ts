/*import {Column, Entity , PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;

     @Column()
    lastName: string;
   
    @Column({unique: true})
        email: string;
}*/
/*import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  Index 
} from 'typeorm';

export enum UserType {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  ADMIN = 'admin',
  DELIVERY_PERSON = 'delivery_person'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;
  
  @Column({ unique: true, length: 255 })
  @Index('idx_users_email')
  email: string;
  
  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;
  
  @Column({ name: 'phone_number', length: 20, nullable: true })
  phoneNumber: string;
  
  @Column({ 
    name: 'user_type', 
    type: 'enum', 
    //length: 20,
    enum: UserType,
    default: UserType.CUSTOMER
  })
  @Index('idx_users_type')
  userType: UserType;
  
  @Column({ name: 'is_active', default: true })
  isActive: boolean;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
*/
import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  Index,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

export enum UserType {
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  ADMIN = 'admin',
  DELIVERY_PERSON = 'delivery_person'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;
  
  @Column({ type: 'varchar', unique: true, length: 255 })
  @Index('idx_users_email')
  email: string;
  
  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;
  
  @Column({ 
    name: 'phone_number', 
    type: 'varchar', 
    length: 20, 
    nullable: true 
  })
  phoneNumber: string | null;
  
  @Column({ 
    name: 'user_type', 
    type: 'enum',
    enum: UserType,
    enumName: 'user_type_enum',
    default: UserType.CUSTOMER
  })
  @Index('idx_users_type')
  userType: UserType;
  
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
  
  @CreateDateColumn({ 
    name: 'created_at', 
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
  
  @UpdateDateColumn({ 
    name: 'updated_at', 
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  lowercaseEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }

  @BeforeInsert()
  setDefaultValues() {
    if (!this.userType) {
      this.userType = UserType.CUSTOMER;
    }
    if (this.isActive === undefined) {
      this.isActive = true;
    }
  }
}