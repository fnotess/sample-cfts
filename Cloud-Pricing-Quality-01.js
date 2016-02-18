{ 
	"AWSTemplateFormatVersion" : "2010-09-09",
	"Description" : "Deployed via Cloud-Pricing-Quality-01.js - Web, OD, Batch servers included.",
	"Parameters" : {
		"ApplicationName" : {
			"Description" : "Name of application",
			"Type" : "String",
			"Default" : "Cloud Pricing QA-UOM",
			"MinLength" : "1",
			"MaxLength" : "255",
			"AllowedPattern" : "[\\x20-\\x7E]*",
			"ConstraintDescription" : "Must contain only ASCII characters."
		},
		"ApplicationId" : {
			"Description" : "Application ID",
			"Type" : "String",
			"Default" : "APP-001151",
			"MinLength" : "1",
			"MaxLength" : "255",
			"AllowedPattern" : "[\\x20-\\x7E]*",
			"ConstraintDescription" : "Must contain only ASCII characters."
		},
		"PONumber" : {
			"Description" : "PO Number for billing",
			"Type" : "String",
			"Default" : "7000001648",
			"MinLength" : "1",
			"MaxLength" : "255",
			"AllowedPattern" : "[\\x20-\\x7E]*",
			"ConstraintDescription" : "Must contain only ASCII characters."
		},
		"PvtSNc" : {
			"Description" : "Private subnet for confidential apps in us-east-1c",
			"Type" : "String",
			"Default" : "subnet-b61cbb9d"
		},
		"VPCID" : {
			"Description" : "Name of and existing VPC",
			"Type" : "String",
			"Default" : "vpc-ff88269a"
		},
		"QualityDBSG" : {
			"Description" : "Cloud Pricing Quality DB Servers Security Group",
			"Type" : "String",
			"Default" : "sg-ecd48289"
		},
		"qaWEBSG" : {
			"Description" : "Cloud Pricing Quality Web Servers Security Group",
			"Type" : "String",
			"Default" : "sg-14d48271"
		},
		"NATaccessSG" : {
			"Description" : "vpc-sysco-nonprod-02-NatAccess-T1IHRRI726WJ",
			"Type" : "String",
			"Default" : "sg-e151a186",
			"ConstraintDescription" : "Must be a valid NAT Security Group."
		},
		"CheckMKSG" : {
			"Description" : "CheckMK Security Group",
			"Type" : "String",
			"Default" : "sg-0f7fc468",
			"ConstraintDescription" : "Must be a valid NAT Security Group."
		},
		"qaWEBAMI" : {
			"Description" : "Cloud Pricing Quality Web Servers Security Group",
			"Type" : "String",
			"Default" : "ami-e428948c"
		},
		"ODAMI" : {
			"Description" : "AMI for OD servers",
			"Type" : "String",
			"Default" : "ami-a43d31cc"
		},
		"Private2c" : {
			"Description" : "Non-Production Confidential us-east-1c subnet",
			"Type" : "String",
			"Default" : "subnet-b61cbb9d"
		},
		"Private2d" : {
			"Description" : "Non-Production Confidential us-east-1d subnet",
			"Type" : "String",
			"Default" : "subnet-ea138a9d"
		},
		"PemKey" : {
			"Description" : "Name of and existing EC2 KeyPair to enable SSH access to the instance",
			"Type" : "String",
			"Default" : "Sysco-KP-CP-NonProd"
		},
		"Approver" : {
			"Description" : "Name of application approver",
			"Type" : "String",
			"Default" : " Sheraz Khan Karen Williams",
			"MinLength" : "1",
			"MaxLength" : "255"
		},
		"Owner" : {
			"Description" : "Name of application owner",
			"Type" : "String",
			"Default" : "Darcy Tomaszewski Samir Patel James Owen",
			"MinLength" : "1",
			"MaxLength" : "255"
		},
		"ProjectId" : {
			"Description" : "Project ID",
			"Type" : "String",
			"Default" : "BT.001176",
			"MinLength" : "1",
			"MaxLength" : "255",
			"AllowedPattern" : "[\\x20-\\x7E]*",
			"ConstraintDescription" : "Must contain only ASCII characters."
		},
		"Environment" : {
			"Description" : "Environment for application",
			"Type" : "String",
			"Default" : "Quality",
			"AllowedValues" : [
				"Sandbox",
				"Development",
				"Quality",
				"Staging",
				"Training",
				"Production"
			],
			"ConstraintDescription" : "Must be a valid environment."
		}
	},
	"Resources" : {
		"MS238CPWS03q": {
			"Type" : "AWS::EC2::Instance",
			"Properties" : {
				"AvailabilityZone" : "us-east-1c",
				"DisableApiTermination" : "false",
				"ImageId" : {"Ref" : "qaWEBAMI"},
				"InstanceType" : "m3.medium",
				"KeyName" : {"Ref" : "PemKey"},
				"SecurityGroupIds" : [{ "Ref" : "qaWEBSG" }, { "Ref" : "NATaccessSG" }, { "Ref" : "CheckMKSG" }],
				"SubnetId" : { "Ref" : "Private2c" },
				"Tags" : [ 
					{ "Key" : "Name", "Value": "MS238CPWS03q" },
					{ "Key" : "Application_Name", "Value" : { "Ref" : "ApplicationName" } },
					{ "Key" : "Application_Id", "Value" : { "Ref" : "ApplicationId" } },
					{ "Key" : "Environment", "Value" : { "Ref" : "Environment" } },
					{ "Key" : "PO_Number", "Value" : { "Ref" : "PONumber" } },
					{ "Key" : "Project_ID", "Value" : { "Ref" : "ProjectId" } },
					{ "Key" : "Owner", "Value" : { "Ref" : "Owner" } },
					{ "Key" : "Approver", "Value" : { "Ref" : "Approver" } }
				],
				"UserData" : { "Fn::Base64" : { "Fn::Join" : [ "",
					[
						"<powershell>\n",
						"Rename-Computer -NewName ms238cpws03q -Restart\n",
						"</powershell>"
					]
				]}}
			}
		},
		"MS238CPAC03q": {
			"Type" : "AWS::EC2::Instance",
			"Properties" : {
				"AvailabilityZone" : "us-east-1c",
				"DisableApiTermination" : "false",
				"ImageId" : {"Ref" : "qaWEBAMI"},
				"InstanceType" : "m3.medium",
				"KeyName" : {"Ref" : "PemKey"},
				"SecurityGroupIds" : [{ "Ref" : "qaWEBSG" }, { "Ref" : "NATaccessSG" }, { "Ref" : "CheckMKSG" }],
				"SubnetId" : { "Ref" : "Private2c" },
				"Tags" : [ 
					{ "Key" : "Name", "Value": "MS238CPAC03q" },
					{ "Key" : "Application_Name", "Value" : { "Ref" : "ApplicationName" } },
					{ "Key" : "Application_Id", "Value" : { "Ref" : "ApplicationId" } },
					{ "Key" : "Environment", "Value" : { "Ref" : "Environment" } },
					{ "Key" : "PO_Number", "Value" : { "Ref" : "PONumber" } },
					{ "Key" : "Project_ID", "Value" : { "Ref" : "ProjectId" } },
					{ "Key" : "Owner", "Value" : { "Ref" : "Owner" } },
					{ "Key" : "Approver", "Value" : { "Ref" : "Approver" } }
				],
				"UserData" : { "Fn::Base64" : { "Fn::Join" : [ "",
					[
						"<powershell>\n",
						"Rename-Computer -NewName ms238cpac03q -Restart\n",
						"</powershell>"
					]
				]}}
			}
		},
		"MS238CPSQL03q": {
			"Type" : "AWS::EC2::Instance",
			"Properties" : {
				"AvailabilityZone" : "us-east-1c",
				"DisableApiTermination" : "false",
				"ImageId" : {"Ref" : "ODAMI"},
				"InstanceType" : "m3.large",
				"KeyName" : {"Ref" : "PemKey"},
				"SecurityGroupIds" : [{ "Ref" : "QualityDBSG" }, { "Ref" : "NATaccessSG" }, { "Ref" : "CheckMKSG" }],
				"SubnetId" : { "Ref" : "Private2c" },
				"Tags" : [ 
					{ "Key" : "Name", "Value": "MS238CPSQL03q" },
					{ "Key" : "Application_Name", "Value" : { "Ref" : "ApplicationName" } },
					{ "Key" : "Application_Id", "Value" : { "Ref" : "ApplicationId" } },
					{ "Key" : "Environment", "Value" : { "Ref" : "Environment" } },
					{ "Key" : "PO_Number", "Value" : { "Ref" : "PONumber" } },
					{ "Key" : "Project_ID", "Value" : { "Ref" : "ProjectId" } },
					{ "Key" : "Owner", "Value" : { "Ref" : "Owner" } },
					{ "Key" : "Approver", "Value" : { "Ref" : "Approver" } }
				],
				"UserData" : { "Fn::Base64" : { "Fn::Join" : [ "",
					[
						"<powershell>\n",
						"Rename-Computer -NewName ms238cpsql03q -Restart\n",
						"</powershell>"
					]]}}
			}
		},
		"MS238CPBTSQL03q": {
			"Type" : "AWS::EC2::Instance",
			"Properties" : {
				"AvailabilityZone" : "us-east-1c",
				"DisableApiTermination" : "false",
				"ImageId" : {"Ref" : "ODAMI"},
				"InstanceType" : "m3.large",
				"KeyName" : {"Ref" : "PemKey"},
				"SecurityGroupIds" : [{ "Ref" : "QualityDBSG" }, { "Ref" : "NATaccessSG" }, { "Ref" : "CheckMKSG" }],
				"SubnetId" : { "Ref" : "Private2c" },
				"Tags" : [ 
					{ "Key" : "Name", "Value": "MS238CPBTSQL03q" },
					{ "Key" : "Application_Name", "Value" : { "Ref" : "ApplicationName" } },
					{ "Key" : "Application_Id", "Value" : { "Ref" : "ApplicationId" } },
					{ "Key" : "Environment", "Value" : { "Ref" : "Environment" } },
					{ "Key" : "PO_Number", "Value" : { "Ref" : "PONumber" } },
					{ "Key" : "Project_ID", "Value" : { "Ref" : "ProjectId" } },
					{ "Key" : "Owner", "Value" : { "Ref" : "Owner" } },
					{ "Key" : "Approver", "Value" : { "Ref" : "Approver" } }
				],
				"UserData" : { "Fn::Base64" : { "Fn::Join" : [ "",
					[
						"<powershell>\n",
						"Rename-Computer -NewName ms238cpbtsql03q -Restart\n",
						"</powershell>"
					]]}}
			}
		},
		"MS238CPODSQL03q": {
			"Type" : "AWS::EC2::Instance",
			"Properties" : {
				"AvailabilityZone" : "us-east-1c",
				"DisableApiTermination" : "false",
				"ImageId" : {"Ref" : "ODAMI"},
				"InstanceType" : "m3.large",
				"KeyName" : {"Ref" : "PemKey"},
				"SecurityGroupIds" : [{ "Ref" : "QualityDBSG" }, { "Ref" : "NATaccessSG" }, { "Ref" : "CheckMKSG" }],
				"SubnetId" : { "Ref" : "Private2c" },
				"Tags" : [ 
					{ "Key" : "Name", "Value": "MS238CPODSQL03q" },
					{ "Key" : "Application_Name", "Value" : { "Ref" : "ApplicationName" } },
					{ "Key" : "Application_Id", "Value" : { "Ref" : "ApplicationId" } },
					{ "Key" : "Environment", "Value" : { "Ref" : "Environment" } },
					{ "Key" : "PO_Number", "Value" : { "Ref" : "PONumber" } },
					{ "Key" : "Project_ID", "Value" : { "Ref" : "ProjectId" } },
					{ "Key" : "Owner", "Value" : { "Ref" : "Owner" } },
					{ "Key" : "Approver", "Value" : { "Ref" : "Approver" } }
				],
				"UserData" : { "Fn::Base64" : { "Fn::Join" : [ "",
					[
						"<powershell>\n",
						"Rename-Computer -NewName ms238cpodsql03q -Restart\n",
						"</powershell>"
					]]}}
			}
		}
	}
}
