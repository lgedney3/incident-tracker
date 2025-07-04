USE [IncidentTrackerDb]
GO
/****** Object:  Table [dbo].[Incidents]    Script Date: 6/30/2025 6:08:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Incidents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](50) NOT NULL,
	[Description] [varchar](2000) NOT NULL,
	[Location] [varchar](50) NULL,
	[Urgency] [varchar](50) NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[LastUpdatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_Incidents] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StatusHistory]    Script Date: 6/30/2025 6:08:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusHistory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IncidentId] [int] NOT NULL,
	[FromStatus] [varchar](50) NOT NULL,
	[ToStatus] [varchar](50) NOT NULL,
	[ChangedAt] [datetime] NOT NULL,
	[ChangedByUserId] [int] NOT NULL,
	[Note] [varchar](1000) NOT NULL,
 CONSTRAINT [PK_StatusHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 6/30/2025 6:08:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[DisplayName] [varchar](50) NOT NULL,
	[Role] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Incidents] ON 

INSERT [dbo].[Incidents] ([Id], [Title], [Description], [Location], [Urgency], [Status], [CreatedAt], [CreatedByUserId], [LastUpdatedAt]) VALUES (1029, N'Printer not working', N'Printer #2 in Lab Room B is not working. I already tried unplugging it and plugging it back in. It shows "Error 44".', N'Lab Room B', N'Low', N'Open', CAST(N'2025-06-28T22:42:35.760' AS DateTime), 1030, CAST(N'2025-06-28T22:42:35.760' AS DateTime))
INSERT [dbo].[Incidents] ([Id], [Title], [Description], [Location], [Urgency], [Status], [CreatedAt], [CreatedByUserId], [LastUpdatedAt]) VALUES (1030, N'Server room power outage', N'All of our servers are down! The power was out in the main server room when we got in this morning and no one knows why. We can''t do any work with the servers offline.', N'Main Server Room', N'High', N'Open', CAST(N'2025-06-28T22:44:47.980' AS DateTime), 1030, CAST(N'2025-06-28T22:45:16.957' AS DateTime))
INSERT [dbo].[Incidents] ([Id], [Title], [Description], [Location], [Urgency], [Status], [CreatedAt], [CreatedByUserId], [LastUpdatedAt]) VALUES (1031, N'Hole in ceiling', N'One of the construction workers made a mistake and there''s a hole in the ceiling in the hallway on floor 2. We''ve already put hazard tape around it to make sure no one from floor 3 falls through.', N'Floor 2 Hallway', N'Medium', N'In Progress', CAST(N'2025-06-28T22:47:18.873' AS DateTime), 1030, CAST(N'2025-06-30T03:10:58.220' AS DateTime))
INSERT [dbo].[Incidents] ([Id], [Title], [Description], [Location], [Urgency], [Status], [CreatedAt], [CreatedByUserId], [LastUpdatedAt]) VALUES (1032, N'My computer blue screened', N'My computer blue screened earlier today while I was working, not sure why. I am working on my laptop for the time being and can still access all my projects but I would like to resume working on my desktop whenever possible.', N'My desk in main staff room', N'Low', N'In Progress', CAST(N'2025-06-28T22:49:18.653' AS DateTime), 1030, CAST(N'2025-06-28T22:54:50.147' AS DateTime))
INSERT [dbo].[Incidents] ([Id], [Title], [Description], [Location], [Urgency], [Status], [CreatedAt], [CreatedByUserId], [LastUpdatedAt]) VALUES (1034, N'Vault door locked down', N'Our vault door is in some kind of lockdown mode. It won''t even let us put the password in. We should be fine until the end of the month but we''ll need to access it then.', N'Main vault- door', N'Medium', N'Resolved', CAST(N'2025-06-28T22:51:58.980' AS DateTime), 1030, CAST(N'2025-06-28T22:54:04.847' AS DateTime))
INSERT [dbo].[Incidents] ([Id], [Title], [Description], [Location], [Urgency], [Status], [CreatedAt], [CreatedByUserId], [LastUpdatedAt]) VALUES (1035, N'Unable to access email', N'I am unable to access my email. I have been on medical leave for five weeks. ', N'', N'Medium', N'Open', CAST(N'2025-06-28T23:00:39.483' AS DateTime), 1030, CAST(N'2025-06-30T12:21:08.017' AS DateTime))
INSERT [dbo].[Incidents] ([Id], [Title], [Description], [Location], [Urgency], [Status], [CreatedAt], [CreatedByUserId], [LastUpdatedAt]) VALUES (1043, N'test11', N'test11', N'test11', N'Medium', N'Resolved', CAST(N'2025-06-30T12:10:23.077' AS DateTime), 1036, CAST(N'2025-06-30T12:21:28.300' AS DateTime))
SET IDENTITY_INSERT [dbo].[Incidents] OFF
GO
SET IDENTITY_INSERT [dbo].[StatusHistory] ON 

INSERT [dbo].[StatusHistory] ([Id], [IncidentId], [FromStatus], [ToStatus], [ChangedAt], [ChangedByUserId], [Note]) VALUES (11, 1034, N'Open', N'In Progress', CAST(N'2025-06-29T02:53:36.437' AS DateTime), 1031, N'We are bringing in a locksmith. He will come tomorrow to take a look at the door.')
INSERT [dbo].[StatusHistory] ([Id], [IncidentId], [FromStatus], [ToStatus], [ChangedAt], [ChangedByUserId], [Note]) VALUES (12, 1034, N'In Progress', N'Resolved', CAST(N'2025-06-29T02:54:04.837' AS DateTime), 1031, N'The locksmith has successfully reset the vault door. Go see the manager to get the new password.')
INSERT [dbo].[StatusHistory] ([Id], [IncidentId], [FromStatus], [ToStatus], [ChangedAt], [ChangedByUserId], [Note]) VALUES (13, 1032, N'Open', N'In Progress', CAST(N'2025-06-29T02:54:50.107' AS DateTime), 1031, N'The computer needs to be replaced. We have ordered a new desktop for you. It will be in Monday. I''ll get back to you then.')
INSERT [dbo].[StatusHistory] ([Id], [IncidentId], [FromStatus], [ToStatus], [ChangedAt], [ChangedByUserId], [Note]) VALUES (14, 1035, N'Open', N'Resolved', CAST(N'2025-06-29T03:02:02.607' AS DateTime), 1031, N'Your password expired while you were out. It should prompt you to reset your password next time you log in. ')
INSERT [dbo].[StatusHistory] ([Id], [IncidentId], [FromStatus], [ToStatus], [ChangedAt], [ChangedByUserId], [Note]) VALUES (21, 1031, N'Open', N'In Progress', CAST(N'2025-06-30T03:10:58.227' AS DateTime), 1031, N'Repair man''s coming out Monday')
INSERT [dbo].[StatusHistory] ([Id], [IncidentId], [FromStatus], [ToStatus], [ChangedAt], [ChangedByUserId], [Note]) VALUES (22, 1043, N'Open', N'In Progress', CAST(N'2025-06-30T12:10:38.340' AS DateTime), 1031, N'test11')
INSERT [dbo].[StatusHistory] ([Id], [IncidentId], [FromStatus], [ToStatus], [ChangedAt], [ChangedByUserId], [Note]) VALUES (23, 1043, N'In Progress', N'Resolved', CAST(N'2025-06-30T12:21:28.310' AS DateTime), 1031, N'resolved')
SET IDENTITY_INSERT [dbo].[StatusHistory] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Email], [DisplayName], [Role]) VALUES (1030, N'JohnDoe@gmail.com', N'John Doe', N'Employee')
INSERT [dbo].[Users] ([Id], [Email], [DisplayName], [Role]) VALUES (1031, N'Jim@support.com', N'Jim_supports123', N'Support Agent')
INSERT [dbo].[Users] ([Id], [Email], [DisplayName], [Role]) VALUES (1032, N'Jerry@gmail.com', N'Jerry', N'Employee')
INSERT [dbo].[Users] ([Id], [Email], [DisplayName], [Role]) VALUES (1034, N'Jimmy@gmail.com', N'Jimmy', N'Employee')
INSERT [dbo].[Users] ([Id], [Email], [DisplayName], [Role]) VALUES (1036, N'Johnny@gmail.com', N'Johnny', N'Employee')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
/****** Object:  Index [IX_Incidents_CreatedByUserID]    Script Date: 6/30/2025 6:08:57 PM ******/
CREATE NONCLUSTERED INDEX [IX_Incidents_CreatedByUserID] ON [dbo].[Incidents]
(
	[CreatedByUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Incidents_Status]    Script Date: 6/30/2025 6:08:57 PM ******/
CREATE NONCLUSTERED INDEX [IX_Incidents_Status] ON [dbo].[Incidents]
(
	[Status] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_StatusHistory_IncidentID]    Script Date: 6/30/2025 6:08:57 PM ******/
CREATE NONCLUSTERED INDEX [IX_StatusHistory_IncidentID] ON [dbo].[StatusHistory]
(
	[IncidentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Users_Email]    Script Date: 6/30/2025 6:08:57 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Users_Email] ON [dbo].[Users]
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Incidents]  WITH CHECK ADD  CONSTRAINT [FK_Incidents_Users] FOREIGN KEY([CreatedByUserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Incidents] CHECK CONSTRAINT [FK_Incidents_Users]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Incidents] FOREIGN KEY([IncidentId])
REFERENCES [dbo].[Incidents] ([Id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Incidents]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Users] FOREIGN KEY([ChangedByUserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Users]
GO
USE [master]
GO
ALTER DATABASE [IncidentTrackerDb] SET  READ_WRITE 
GO
