import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { useSelector } from 'react-redux'
import { DataTableGroup } from './DataTableGroup';
import Grid from '@material-ui/core/Grid';
import { DataTableUserFromGroup } from './DataTableUserFromGroup';



export const TableSearchGroup = () => {

		return (
			<div className="row">
				<div className="col-xl-12 col-lg-12 col-md-12 col-12">
					<div className="jr-card">
	
						<div className="jr-card-header d-flex align-items-center">
							<div>
							<h3 className="mb-0">
								<IntlMessages id="Grupos" />
							</h3>
							</div>
							<div style={{color: '#FFA800'}} className="row ml-auto">		
							</div>
						</div>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                        <DataTableGroup/>
                        </Grid>
                        <Grid item xs={8}>
                        <DataTableUserFromGroup/>
                        </Grid>
                    </Grid>
					
					
			
					</div>
				</div>
			</div>
		)
	
}
