BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[MonthlyElectorate] (
    [id] INT NOT NULL IDENTITY(1,1),
    [year] INT NOT NULL,
    [marital_status] NVARCHAR(1000) NOT NULL,
    [age_range] NVARCHAR(1000) NOT NULL,
    [gender] NVARCHAR(1000) NOT NULL,
    [education_level] NVARCHAR(1000) NOT NULL,
    [month] INT NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [region] NVARCHAR(1000) NOT NULL,
    [situation] NVARCHAR(1000) NOT NULL,
    [uf] NVARCHAR(1000) NOT NULL,
    [zone] INT NOT NULL,
    [elector_quantity] INT NOT NULL,
    [load_date] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [MonthlyElectorate_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
