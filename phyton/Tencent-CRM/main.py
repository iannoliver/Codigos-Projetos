# %%
import pandas as pd
from ftfy import fix_encoding

# Read the contacts file
companies = []
with open('contatos.txt', 'r', encoding='utf-8') as file:
    companies = file.readlines()

# Fix encoding issues
companies = [fix_encoding(line.replace('\n', '')) for line in companies]

# Load the csv file for Contacts
df_contacts = pd.read_csv('Contacts_2024_10_21.csv')
print(f"# of df_contacts: {df_contacts.shape[0]}")


# Create an final dataframe with First Name, Last Name, Email, Phone, Company Name
final_df = pd.DataFrame(
    columns=['First Name', 'Last Name', 'Email', 'Phone', 'Company Name', 'Contact Owner'])

for company in companies:
    # check if the company is in the column "Account Name"
    # show the rows where the company is in the column "Account Name"
    match = df_contacts[df_contacts['Account Name'].str.strip(
    ).str.lower() == company.strip().lower()]

    if match.shape[0] > 0:
        first_name = match['First Name'].values[0]
        last_name = match['Last Name'].values[0]
        email = match['Email'].values[0]
        phone = match['Phone'].values[0] if not pd.isnull(
            match['Phone'].values[0]) else match['Mobile'].values[0]
        company_name = match['Account Name'].values[0]
        contact_owner = match['Contact Owner'].values[0]
        final_df = final_df._append({'First Name': first_name, 'Last Name': last_name,
                                    'Email': email, 'Phone': phone, 'Company Name': company_name, 'Contact Owner': contact_owner}, ignore_index=True)

# Load the csv file for Leads
df_leads = pd.read_csv('Leads_2024_10_21.csv')
print(f"# of df_leads: {df_leads.shape[0]}")

for company in companies:
    # check if the company is in the column "Account Name"
    # show the rows where the company is in the column "Account Name"
    match = df_leads[df_leads['Last Name'].str.strip(
    ).str.lower() == company.strip().lower()]

    if match.shape[0] > 0:
        first_name = match['First Name'].values[0]
        last_name = match['Last Name'].values[0]
        email = match['Email'].values[0]
        phone = match['Phone'].values[0] if not pd.isnull(
            match['Phone'].values[0]) else match['Mobile'].values[0]
        company_name = match['Company'].values[0] if not pd.isnull(
            match['Company'].values[0]) else match['Last Name'].values[0]
        contact_owner = match['Lead Owner'].values[0]
        final_df = final_df._append({'First Name': first_name, 'Last Name': last_name,
                                    'Email': email, 'Phone': phone, 'Company Name': company_name, 'Contact Owner': contact_owner}, ignore_index=True)

final_df.to_csv('final_contacts.csv', index=False)
