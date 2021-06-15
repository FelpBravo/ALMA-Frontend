import React , { useState }from 'react';
import IntlMessages from 'util/IntlMessages';
import { DataTableGroup } from './DataTableGroup';
import Grid from '@material-ui/core/Grid';
import { DataTableUserFromGroup } from './DataTableUserFromGroup';



export const TableSearchGroup = () => {

	const [openUserFromGroup, setOpenUserFromGroup] = useState(false)

		return (
			<div className="row">
				<div className="col-xl-12 col-lg-12 col-md-12 col-12">
					<div className="jr-card">
	
						<div className="jr-card-header d-flex align-items-center">
							<div>
							<h3 className="mb-0">
								<IntlMessages id="title.groups" />
							</h3>
							</div>
							<div style={{color: '#FFA800'}} className="row ml-auto">		
							</div>
						</div>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                        <DataTableGroup setOpenUserFromGroup={setOpenUserFromGroup}/>
                        </Grid>
                        <Grid item xs={8}>
						{ Boolean(openUserFromGroup) &&  <DataTableUserFromGroup setOpenUserFromGroup={setOpenUserFromGroup}/>}
                       
                        </Grid>
                    </Grid>
					
					
			
					</div>
				</div>
			</div>
		)
	
}
