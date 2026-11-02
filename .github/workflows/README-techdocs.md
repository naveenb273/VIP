
# Build Techdocs with Github Actions

<br>

**Description:**
<br> The action builds documentation for a component accessible from Volvo Developer Platform (Backstage). The documentation is called `techDocs`.

More information about `techDocs` itself can be found on [this](https://confluence.it.volvo.net/display/ADSO/Tech+Docs) confluence page.

**Expected results**:
- `techDocs` build process is tested on PRs, to ensure user that there are no mistakes in a files structure etc.
- `techDocs` are built and updated to Storage Account on merge to `master/main` branch

**Input parameters**
|Name|Required|Default value|Description|
| :---: | :---: | :---: | :---: |
|entity-name|`false`|Generated based on the repository name without organization prefix (`VolvoGroup-Internal`).|Name of the entity for which techDocs are published.|
|azure-storage-key|`true`| N/A |Azure Storage key, required for access. The key is stored as a secret (``) at Organization level accessible for all internal repositories.|
|techdocs-client-id|`true`|N/A|Client ID for accessing Techdocs Storage Account. It's stored as a secret (``) at Organization level accessible for all internal repositories.  |
|techdocs-client-secret|`true`|N/A|Client secret for accessing Techdocs Storage Account.  It's stored as a secret (``) at Organization level accessible for all internal repositories.|
|techdocs-subscription-id|`false`|`adec6313-fbf7-438d-85de-26be6fc67689`|Subscription id for Backstage environment. Defaults to `prod`.|
|tenant-id|`false`|`f25493ae-1c98-41d7-8a33-0be75f5fe603`|Subscription id for Backstage environment. Defaults to Volvo Group tenant id.|
|azure-storage-name|`false`|`stdocsdsoprod0003`|Name of Azure Storage where techDocs should be published.|
|tech-docs-path|`false`|`techDocs`|Path to tech docs directory.|
|main-branch-name|`false`|`refs/heads/main`|Main branch of the entity repository. Possible values are `refs/heads/main` and `refs/heads/main`.|
|container-name|`false`|`docs`|Name of the techdocs container.|
|load-from-readme| `false` | `false` | Specify, whether to load documentation from readme file |
|readme-file-path| `false` | `README.md ` | Path to readme file, valid only if loadFromReadme=true |
|images-dir-path| `false` | `N/A` | Path to directory with readme images, keep it empty if no images included, valid only if loadFromReadme=true |
|entity-kind| `false` | component | Entity kind. Possible values are: component, api, system, template.|
 
**Example usage**

The below pipeline is triggered only when changes are in `techDocs` directory on `PRs` or on `master`.

``` 
name: techdocs

on: 
  pull_request:
    paths:
      - techDocs/**
  push:
    branches:
      - main
    paths:
      - techDocs/**

jobs:
  tech-docs:
    name: Generate techDocs
    runs-on: ubuntu-latest
    steps:
    - name: techdocs
      uses: VolvoGroup-Internal/devsecops-shared-github/actions/backstage/techdocs@main
      with:
        azure-storage-key: ${{ secrets.BACKSTAGE_TECHDOCS_STORAGE_KEY_PROD }}
        techdocs-client-id: ${{ secrets.BACKSTAGE_TECHDOCS_PROD_CLIENT_ID }}
        techdocs-client-secret: ${{ secrets.BACKSTAGE_TECHDOCS_PROD_CLIENT_SECRET }}

```  